import rp from 'request-promise';
import store from '../store';
import { updateParsingStatus } from '../actions/ProcessActions';
import { ParseMethods } from '../misc/methods';

export default class Parser {
    constructor(config, links) {
        this.queue = links;
        this.config = config;

        this.results = {
            proxies: []
        };

        this.counter = {
            done: 0,
            all: links.length
        };

        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            this.launch();
        }).catch(error => alert(error));
    }

    async parse(url, retry) {
        try {
            const html = await rp.get({ url, timeout: 5000 });
            this.onResponse(url, html);
        } catch (error) {
            this.onError(url, retry);
        }
    }

    onResponse(url, html) {
        const table = ParseMethods.table(html);
        const primitive = ParseMethods.primitive(html);
        const proxies = table && primitive ? [...table, ...primitive] : primitive ? primitive : table;

        if (proxies.length > 0) {
            this.results.proxies.push(proxies);
        }

        this.isDone();
    }

    onError(url, retry) {
        if (!retry && this.config.retry) {
            return this.parse(url, true);
        }

        this.isDone();
    }

    isDone() {
        this.counter.done++;
        store.dispatch(updateParsingStatus(this.counter.done, this.results.length));

        if (this.counter.done == this.counter.all) {
            this.resolve(this.results);
        } else {
            this.run();
        }
    }

    run() {
        if (!this.queue.length) {
            return;
        }

        const url = this.queue.pop();
        this.parse(url);
    }

    launch() {
        const startThreadsCount = this.queue.length > this.config.threads ? this.config.threads : this.queue.length;

        setTimeout(() => {
            for (let index = 0; index < startThreadsCount; index++) {
                this.run();
            }
        }, 300);
    }
}
