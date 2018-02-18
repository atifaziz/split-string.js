// Copyright 2018 Atif Aziz
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

(function(root, undefined) {

    const is = (type) => (v) => toString.call(v) === `[object ${type}]`;
    is.String = is('String'),
    is.Object = is('Object');

    function splitString(delimiter, limit) {
        const unlimited = limit === undefined;
        limit = +limit;
        if (!unlimited && isNaN(limit)) {
            throw new TypeError('Invalid limit argument. Must be a Number.');
        }
        // TODO Allow delimiter to be a regular expression
        if (!is.String(delimiter)) {
            throw new TypeError('Invalid delimiter argument. Must be a String.');
        }
        if (!delimiter.length) {
            throw new TypeError('Invalid delimiter argument. Must be a non-empty string.');
        }
        if (limit === 1) {
            return [this.toString()];
        } else if (limit === 0) {
            return [];
        }
        let si = 0;
        const tokens = [];
        while (unlimited || tokens.length < limit - 1) {
            let i = this.indexOf(delimiter, si);
            if (i < 0) {
                break;
            }
            tokens.push(this.substring(si, i));
            si = i + delimiter.length;
        }
        if (si <= this.length) {
            tokens.push(this.substring(si, this.length));
        }
        return tokens;
    }

    if (is.Object(exports) && !is.String(exports.nodeName)) { // node
        module.exports = splitString;
    } else if (root) { // browser
        root.splitString = splitString;
    }

    if (module && module.exports) {
        module.exports = splitString;
    }

})(this);
