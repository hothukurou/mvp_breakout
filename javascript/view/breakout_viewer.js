import { DomHelper } from "./dom_helper.js";

export class BreakoutViewer {

    constructor() {
        // コールバック関数
        this.pressLeftButton = undefined;
        this.releaseLeftButton = undefined;
        this.pressRightButton = undefined;
        this.releaseRightButton = undefined;
        this.releaseDisplay = undefined;

        // 初期から存在するDOMの定義
        this.displayDom = document.getElementsByClassName("display")[0];
        this.barDom = document.getElementsByClassName("bar")[0];
        this.ballDom = document.getElementsByClassName("ball")[0];
        this.leftButtonDom = document.getElementsByClassName("left-button")[0];
        this.rightButtonDom = document.getElementsByClassName("right-button")[0];
        this.explainLabelDom = document.getElementsByClassName("explain-label")[0];

        // ブロックDOMの定義
        this.blockDoms = [];

        // マウス用イベント
        this.leftButtonDom.addEventListener("mousedown", () => { this.pressLeftButton(); }, false);
        this.leftButtonDom.addEventListener("mouseup", () => { this.releaseLeftButton(); }, false);
        this.leftButtonDom.addEventListener("mouseout", () => { this.releaseLeftButton(); }, false);
        this.rightButtonDom.addEventListener("mousedown", () => { this.pressRightButton(); }, false);
        this.rightButtonDom.addEventListener("mouseup", () => { this.releaseRightButton(); }, false);
        this.rightButtonDom.addEventListener("mouseout", () => { this.releaseRightButton(); }, false);
        this.displayDom.addEventListener("mouseup", () => { this.releaseDisplay(); }, false);

        // スマホ用イベント
        this.leftButtonDom.addEventListener("touchstart", () => { this.pressLeftButton(); }, false);
        this.leftButtonDom.addEventListener("touchend", () => { this.releaseLeftButton(); }, false);
        this.rightButtonDom.addEventListener("touchstart", () => { this.pressRightButton(); }, false);
        this.rightButtonDom.addEventListener("touchend", () => { this.releaseRightButton(); }, false);
        this.displayDom.addEventListener("touchend", () => { this.releaseDisplay(); }, false);

        // 静的配置dom設定
        DomHelper.setDomPosition(this.leftButtonDom, { x: 50, y: 440 });
        DomHelper.setDomPosition(this.rightButtonDom, { x: 250, y: 440 });
        DomHelper.setDomPosition(this.explainLabelDom, { x: 0, y: 350 });

    }

    changeTextContent(text) {
        DomHelper.changeDomTextContent(this.explainLabelDom, text);
    }

    // ブロック設置
    setBlocks(blocksPos) {
        // 画面にブロックが残っていれば、全部削除してblockDomsを空にする
        while (this.blockDoms.length > 0) {
            DomHelper.removeChildDom(this.displayDom, this.blockDoms.pop());
        }

        //ブロック生成 (w:20px h:10px)
        for (const blockPos of blocksPos) {
            const blockDom = DomHelper.createDom("block");
            DomHelper.setDomPosition(blockDom, { x: blockPos.x, y: blockPos.y });
            DomHelper.addChildDom(this.displayDom, blockDom);
            this.blockDoms.push(blockDom);
        }
    }
    setBallPos(pos) {
        DomHelper.setDomPosition(this.ballDom, pos);
    }
    setBarPos(pos) {
        DomHelper.setDomPosition(this.barDom, pos);
    }

    // 出力系イベント
    setReleaseDisplayButtonCallback(func) {
        this.releaseDisplay = func;
    }
    setPressLeftButtonCallback(func) {
        this.pressLeftButton = func;
    }
    setReleaseLeftButtonCallback(func) {
        this.releaseLeftButton = func;
    }
    setPressRightButtonCallback(func) {
        this.pressRightButton = func;
    }
    setReleaseRightButtonCallback(func) {
        this.releaseRightButton = func;
    }

}