import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ScriptService {

    constructor() {}

    execute(src: string, options?: {
        id?: string,
        async?: boolean,
        defer?: boolean,
        crossOrigin?: string,
        nonce?: string,
        onload?: () => void;
    }): boolean {
        options = {
            id: options.id || null,
            async: options.async || false,
            defer: options.defer || false,
            crossOrigin: options.crossOrigin || null,
            nonce: options.nonce || null,
            onload: options.onload || undefined
        }

        if (options.id) {
            if (document.getElementById(options.id)) {
                return false;
            }
        }

        let script: HTMLScriptElement = document.createElement('script');

        script.src = src;

        if (options.id) {
            script.id = options.id;
        }

        if (options.async) {
            script.async = options.async;
        }

        if (options.defer) {
            script.defer = options.defer;
        }

        if (options.crossOrigin) {
            script.crossOrigin = options.crossOrigin;
        }

        if (options.nonce) {
            script.nonce = options.nonce;
        }

        if (options.onload) {
            script.onload = options.onload;
        }

        document.head.appendChild(script);

        return true;
    }
}
