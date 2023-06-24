'use strict';

// ボタンと入力された数値を取得
const button = document.getElementById("submit");
const num1 = document.getElementById("text1");

const mask = document.getElementById("mask");
const modal = document.getElementById("modal");
const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");
const remain = document.getElementById("remain");
const retry = document.getElementById("retry");

// 残り回数の設定
let credit = 5;

// 答えの数値の元になる配列
const arr1 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// ボタンの初期状態は「無効」
button.disabled = true;

function selectans() {
    let ans1 = [];
    while(ans1.length < 3) {
        // 配列からランダムに選ぶ
        const rand = Math.floor(Math.random() * arr1.length);
        // 選んだ要素を答え用の配列に入れる
        ans1.push(arr1[rand]);
        // 元の配列からは消す（重複防止）
        arr1.splice(rand, 1);
    }
    return ans1;
}

let ans = selectans();
// ページの表示と同時に実行
window.onload = selectans;

function selectnum() {
    let arr1 = String(num1.value).split('');
    let arr2 = Array.from(new Set(arr1));
            
    if(arr2.length === 3) {
        button.disabled = false;
        } else {
        button.disabled = true;
    }
    return arr2;
}

function numChk() {
    let num = selectnum();
    let hit = 0;
    let blow = 0;

    // while(credit > 0) {
    for(let i = 0; i < 3; i++){
        if(num[i] == ans[i]) {
            hit += 1;
        } else if(ans.includes(num[i])) {
            blow += 1;
        }
    }
    // hitが3なら終了。3でなければblowの処理へ
    if(hit == 3) {
        // 終了メッセージのウィンドウを表示
        mask.classList.remove('hidden');
        modal.classList.remove('hidden');
        
        // 終了メッセージを表示 
        result2.innerHTML = "おめでとう！正解！";
        
        // 「再実行」ボタンを押した時の処理
        // retry.addEventListener('click', function(){
        //     // クレジットを初期化
        //     credit = 5;
        //     // 入力欄を空欄にする
        //     num1.value = '';
        //     // ウィンドウを閉じる
        //     mask.classList.add('hidden');
        //     modal.classList.add('hidden');
        //     // ヒットとブローの表示を削除
        //     result1.innerHTML = "";
        //     // 答えの数字を再選択する
        //     ans = selectans();
        // });
    }
    // ヒット数とブロー数を画面に表示
    result1.innerHTML = "ヒット:" + hit + " ブロー:" + blow;
    console.log(ans);
    credit -= 1;
    remain.innerHTML = "残り回数:" + credit;
    
    if(credit == 0){
        // 終了メッセージのウィンドウを表示
        mask.classList.remove('hidden');
        modal.classList.remove('hidden');
        // 終了メッセージを表示 
        result2.innerHTML = "残念！正解は「" + ans.join('') + "」でした！";
    }
}

function reTry() {
    // クレジットを初期化
    credit = 5;
    // 入力欄を空欄に
    num1.value='';
    // ウィンドウを閉じる
    mask.classList.add('hidden');
    modal.classList.add('hidden');
    // ヒット・ブロー・残り回数の表示を削除
    result1.innerHTML = "";
    remain.innerHTML = "";
    // 答えの数字を再選択する
    ans = selectans();
}
