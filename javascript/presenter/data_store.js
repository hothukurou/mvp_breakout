export class DataStore {
    constructor() {
        this.blockPoses = [];
        this.barLeftSpeed = 0;
        this.barRightSpeed = 0;
        this.barPos = { x: 175, y: 410 };
        this.ballPos = { x: 190, y: 300 };
        this.ballVec = { x: 5, y: 5 };
        this.gameMode = "startWait"; // "startWait"|"gamePlaying"|"clear"


        this.init();
    }

    init() {
        // 状態の初期化
        this.gameMode = "startWait";
        // ボール向き定義
        this.ballVec = { x: 3, y: -3 };
        this.barPos = { x: 175, y: 410 };
        this.ballPos = { x: 190, y: 300 };

        this.blockPoses = [];
    }
}