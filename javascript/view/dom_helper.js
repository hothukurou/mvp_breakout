    /**
     * ヘルパー関数群
     * (関数をまとめただけなのでstaticなメソッドのみ)
     */
    export class DomHelper {
        static constructor() {} //　インスタンス化させないときにこのように書く
        static changeTextContent(text) {
            this.changeDomTextContent(this.explainLabelDom, text);
        }

        static setDomPosition(dom, pos) {
            dom.style.left = `${pos.x}px`;
            dom.style.top = `${pos.y}px`;
        }

        static getDomPosition(dom) {
            const pos = {
                x: parseFloat(dom.style.left),
                y: parseFloat(dom.style.top)
            };
            return pos;
        }

        static createDom(className) {
            const dom = document.createElement('div');
            dom.classList.add(className);
            return dom;
        }

        static addChildDom(parentDom, childDom) {
            parentDom.append(childDom);
        }

        static removeChildDom(parentDom, childDom) {
            parentDom.removeChild(childDom);
        }

        static changeDomTextContent(dom, textContent) {
            dom.textContent = textContent;
        }
    }