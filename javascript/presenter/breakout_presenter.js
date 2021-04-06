import { checkCollision } from "../model/math2d.js";

export class BreakoutPresenter {
    constructor(store, breakoutViewer) {
        this.store = store;
        this.breakoutViewer = breakoutViewer;

        this.breakoutViewer.setPressLeftButtonCallback(() => { this.pressLeftButton(); });
        this.breakoutViewer.setReleaseLeftButtonCallback(() => { this.releaseLeftButton(); });
        this.breakoutViewer.setPressRightButtonCallback(() => { this.pressRightButton(); });
        this.breakoutViewer.setReleaseRightButtonCallback(() => { this.releaseRightButton(); });
        this.breakoutViewer.setReleaseDisplayButtonCallback(() => { this.releaseDisplay(); });

        this.breakoutViewer.setBarPos(this.store.barPos);
        this.breakoutViewer.setBallPos(this.store.ballPos);

        this.onenterframe();
        this.init();
    }

    /** 状態の初期化を行う */
    init() {
        this.store.init();
        this.breakoutViewer.changeTextContent("click to start");
        //ブロック生成 (w:20px h:10px)
        for (let xIndex = 0; xIndex < 10; xIndex++) {
            for (let yIndex = 0; yIndex < 10; yIndex++) {
                this.store.blockPoses.push({ x: xIndex * 40, y: yIndex * 20 });
            }
        }
        // ブロック表示
        this.breakoutViewer.setBlocks(this.store.blockPoses);
        this.breakoutViewer.setBallPos(this.store.ballPos);
        this.breakoutViewer.setBarPos(this.store.barPos);
    }


    /**
     * 入力イベント
     */
    pressLeftButton() {
        this.store.barLeftSpeed = 5;
    }

    releaseLeftButton() {
        this.store.barLeftSpeed = 0;
    }

    pressRightButton() {
        this.store.barRightSpeed = 5;
    }

    releaseRightButton() {
        this.store.barRightSpeed = 0;
    }

    releaseDisplay() {
        if (this.store.gameMode === "startWait") {
            this.breakoutViewer.changeTextContent("break all blocks!");
            this.store.gameMode = "gamePlaying";
        }
    }

    /**
     * 毎フレームごとに実行する関数（initで実行したら永遠実行し続ける）
     */
    onenterframe() {
        switch (this.store.gameMode) {
            case "gamePlaying":
                {
                    // バーの操作
                    const barMovedPos = {
                        x: this.store.barPos.x + this.store.barRightSpeed - this.store.barLeftSpeed,
                        y: this.store.barPos.y
                    };
                    if (barMovedPos.x >= 0 && barMovedPos.x <= 340) {
                        this.breakoutViewer.setBarPos(barMovedPos);
                        this.store.barPos = barMovedPos;
                    }

                    // ボール移動
                    this.store.ballPos = {
                        x: this.store.ballPos.x + this.store.ballVec.x,
                        y: this.store.ballPos.y + this.store.ballVec.y
                    };
                    if (this.store.ballPos.x > 390) {
                        this.store.ballPos.x = 390;
                        this.store.ballVec.x = -this.store.ballVec.x;
                    }
                    if (this.store.ballPos.x < 0) {
                        this.store.ballPos.x = 0;
                        this.store.ballVec.x = -this.store.ballVec.x;
                    }
                    if (this.store.ballPos.y < 0) {
                        this.store.ballPos.y = 0;
                        this.store.ballVec.y = -this.store.ballVec.y;
                    }
                    if (this.store.ballPos.y > 510) {
                        this.init(); // ボールが画面下にいってしまうとゲームオーバーなので初期化する
                    } else {
                        this.breakoutViewer.setBallPos(this.store.ballPos);
                    }

                    // ブロックとの衝突処理
                    for (const blockPos of this.store.blockPoses) {
                        if (checkCollision({ x: blockPos.x, y: blockPos.y, width: 40, height: 20 }, { x: this.store.ballPos.x, y: this.store.ballPos.y, width: 10, height: 10 })) {
                            this.store.blockPoses = this.store.blockPoses.filter((pos => {
                                return pos != blockPos;
                            }));
                            this.store.ballVec.y = -this.store.ballVec.y;
                        }
                    }

                    // バーと球の衝突処理
                    if (checkCollision({ x: this.store.barPos.x, y: this.store.barPos.y, width: 60, height: 20 }, { x: this.store.ballPos.x, y: this.store.ballPos.y, width: 10, height: 10 })) {
                        this.store.ballPos.y = this.store.barPos.y - 20;
                        this.store.ballVec.y = -this.store.ballVec.y;
                    }

                    // ブロックが全てなくなったか調べる
                    if (this.store.blockPoses.length === 0) {
                        this.store.gameMode = "clear";
                        this.breakoutViewer.changeTextContent("CLEAR!");
                    }
                    this.breakoutViewer.setBlocks(this.store.blockPoses);
                    break;
                }
        }
        window.requestAnimationFrame(() => {
            this.onenterframe();
        });
    }
}