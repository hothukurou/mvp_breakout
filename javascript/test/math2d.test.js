import { calcLength, checkCollision } from "../model/math2d.js";;

const RED = '\u001b[31m';
const GREEN = '\u001b[32m';
const checkAssert = (testName, result) => {
    if (result) console.log(`${GREEN}◎ ${testName}`);
    else console.log(`${RED}✘ ${testName}`);
}


function calcLengthTest() {
    console.log("calcLengthTest");
    checkAssert("(10,10)と(10,100)の長さは90である", calcLength({ x: 10, y: 10 }, { x: 10, y: 100 }) === 90);
    checkAssert("(20,20)と(100,20)の長さは80である", calcLength({ x: 20, y: 20 }, { x: 100, y: 20 }) === 80);

}

function checkCollisionTextTest() {
    console.log("calcCollisionTest");
    const rect1 = { x: 10, y: 10, width: 10, height: 10 };
    const rect2 = { x: 15, y: 15, width: 10, height: 10 };
    const rect3 = { x: 20, y: 20, width: 10, height: 10 };
    const rect4 = { x: 20, y: 31, width: 100, height: 10 };
    checkAssert("衝突パターン１", checkCollision(rect1, rect2) === true);
    checkAssert("衝突パターン２", checkCollision(rect2, rect3) === true);
    checkAssert("衝突パターン３（接点が交差）", checkCollision(rect1, rect3) === true);
    checkAssert("衝突しないパターン１", checkCollision(rect1, rect4) === false);
    checkAssert("衝突しないパターン１", checkCollision(rect2, rect4) === false);
    checkAssert("衝突しないパターン１", checkCollision(rect3, rect4) === false);
}


calcLengthTest();
checkCollisionTextTest();