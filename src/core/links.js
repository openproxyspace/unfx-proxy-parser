import rp from 'request-promise';
import store from '../store';
import { uniq } from '../misc/other';
import { addCrawlLevel, updateCrawlLevelStatus } from '../actions/ProcessActions';
import { isURL } from '../misc/regexes';
import { EventEmitter } from 'events';

EventEmitter.defaultMaxListeners = 0;

export default class Links {
    constructor(config, links) {
        this.queue = links;
        this.config = config;
        this.nextLinks = new Set([]);
        this.passedLinks = {
            // 'site.com': new Set(['https://site.com/one', 'https://site.com/two']);
        };

        this.counter = {
            links: {
                all: links.length,
                passed: 0
            },
            level: {
                max: config.level,
                current: 0
            }
        };

        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            this.launch();
        }).catch(error => alert(error));
    }

    async crawl(url, retry) {
        try {
            const html = await rp.get({ url, timeout: 5000 });
            this.onResponse(url, html);
        } catch (error) {
            this.onError(url, retry);
        }
    }

    grabLinks(html) {
        try {
            return html.match(new RegExp(/<a(.*?)href=(((\'|").*?(\'|")))/gi)).map(item => item.match(/href=(?:(?:\'|")(.*?)(?:\'|"))/i)[1]);
        } catch (error) {
            return [];
        }
    }

    getUrlProps(url) {
        const match = url.match(/^(http|https)?(?:[\:\/]*)([a-z0-9\.-]*)(?:\:([0-9]+))?(\/[^?#]*)?(?:\?([^#]*))?(?:#(.*))?$/i);

        return {
            protocol: match[1],
            host: match[2],
            path: match[4]
        };
    }

    onResponse(url, html) {
        const links = this.grabLinks(html);
        const urlProps = this.getUrlProps(url);

        if (this.passedLinks[urlProps.host] == undefined) {
            this.passedLinks[urlProps.host] = new Set([url]);
        } else {
            this.passedLinks[urlProps.host].add(url);
        }

        let nextLinks = uniq(
            links.map(item => {
                if (isURL(item)) {
                    return item;
                } else {
                    if (item[0] == '/') {
                        return urlProps.protocol + '://' + urlProps.host + item;
                    } else {
                        return urlProps.protocol + '://' + urlProps.host + '/' + item;
                    }
                }
            })
        );

        if (!this.config.external) {
            nextLinks = nextLinks.filter(item => this.getUrlProps(item).host == urlProps.host);
        }

        nextLinks = nextLinks.filter(item => {
            const { host } = this.getUrlProps(item);
            return this.passedLinks[host] == undefined || !this.passedLinks[host].has(item);
        });

        this.nextLinks = new Set([...this.nextLinks, ...nextLinks]);
        this.isDone();
    }

    onError(url, retry) {
        if (!retry && this.config.retry) {
            return this.crawl(url, true);
        }

        this.isDone();
    }

    isDone() {
        this.counter.links.passed++;
        store.dispatch(updateCrawlLevelStatus(this.counter.level.current, this.counter.links.passed, this.nextLinks.size));

        if (this.counter.links.passed == this.counter.links.all) {
            this.counter.level.current++;

            if (this.counter.level.current == this.counter.level.max) {
                this.resolveResults();
            } else {
                this.queue = [...this.nextLinks];

                if (this.queue.length > 0) {
                    this.counter.links = {
                        all: this.queue.length,
                        passed: 0
                    };

                    this.nextLinks = new Set([]);
                    this.launch();
                } else {
                    this.resolveResults();
                }
            }
        } else {
            this.run();
        }
    }

    run() {
        if (!this.queue.length) {
            return;
        }

        const url = this.queue.pop();
        this.crawl(url);
    }

    resolveResults() {
        const passedLinks = Object.keys(this.passedLinks).reduce((prev, curr) => [...prev, ...this.passedLinks[curr]], []);
        this.resolve(uniq([...passedLinks, ...this.nextLinks]));
    }

    launch() {
        store.dispatch(addCrawlLevel(this.counter.level.current, this.counter.links.passed, this.counter.links.all));
        const startThreadsCount = this.queue.length > this.config.threads ? this.config.threads : this.queue.length;

        setTimeout(() => {
            for (let index = 0; index < startThreadsCount; index++) {
                this.run();
            }
        }, 300);
    }
}
