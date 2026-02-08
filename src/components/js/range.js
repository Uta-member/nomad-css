/**
 * nomad-css Range Component
 * 
 * Range（スライダー）の塗りつぶしトラック機能を提供します。
 * WebKit系ブラウザ（Chrome, Safari, Edge）では、0%から現在値までの
 * 塗りつぶしを動的に更新するためにこのスクリプトが必要です。
 * 
 * Firefoxでは::-moz-range-progressがネイティブサポートされているため、
 * このスクリプトなしでも塗りつぶしが機能します。
 * 
 * 使用方法:
 * 1. CSSと一緒にこのスクリプトを読み込む
 * 2. DOMContentLoaded後に自動的に初期化される
 * 3. 動的に追加されたRangeには initRange() を手動で呼び出す
 * 
 * @example
 * // 動的に追加されたRangeを初期化
 * const newRange = document.createElement('input');
 * newRange.type = 'range';
 * newRange.className = 'range primary';
 * document.body.appendChild(newRange);
 * nomadRange.initRange(newRange);
 * 
 * // または複数のRangeを一括初期化
 * nomadRange.initAll();
 */

(function(global) {
    'use strict';

    /**
     * 単一のRange要素を初期化
     * @param {HTMLInputElement} range - 初期化するRange要素
     */
    function initRange(range) {
        if (!range || range.type !== 'range') {
            return;
        }

        // .range-flat クラスがある場合はスキップ
        if (range.classList.contains('range-flat')) {
            return;
        }

        // 既に初期化済みの場合はスキップ
        if (range.dataset.nomadRangeInit) {
            return;
        }

        const updateFill = function() {
            const min = parseFloat(range.min) || 0;
            const max = parseFloat(range.max) || 100;
            const value = parseFloat(range.value) || 0;
            const percent = ((value - min) / (max - min)) * 100;
            range.style.setProperty('--range-fill-percent', percent + '%');
        };

        // 初期値を設定
        updateFill();

        // inputイベントでリアルタイム更新
        range.addEventListener('input', updateFill);

        // changeイベントでも更新（一部ブラウザ対応）
        range.addEventListener('change', updateFill);

        // 初期化済みフラグを設定
        range.dataset.nomadRangeInit = 'true';
    }

    /**
     * ドキュメント内のすべての.rangeを初期化
     * @param {Element} [root=document] - 検索のルート要素
     */
    function initAll(root) {
        root = root || document;
        var ranges = root.querySelectorAll('.range:not(.range-flat)');
        for (var i = 0; i < ranges.length; i++) {
            initRange(ranges[i]);
        }
    }

    /**
     * Range要素の初期化を解除
     * @param {HTMLInputElement} range - 初期化を解除するRange要素
     */
    function destroyRange(range) {
        if (!range || !range.dataset.nomadRangeInit) {
            return;
        }

        // CSS変数をリセット
        range.style.removeProperty('--range-fill-percent');

        // フラグを削除
        delete range.dataset.nomadRangeInit;

        // Note: イベントリスナーは同じ関数参照がないと削除できないため、
        // 完全なクリーンアップが必要な場合は要素を再作成することを推奨
    }

    // 公開API
    var nomadRange = {
        initRange: initRange,
        initAll: initAll,
        destroyRange: destroyRange,
        version: '1.0.0'
    };

    // グローバルに公開
    global.nomadRange = nomadRange;

    // DOMContentLoaded時に自動初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initAll();
        });
    } else {
        // 既にDOMが読み込まれている場合は即座に初期化
        initAll();
    }

})(typeof window !== 'undefined' ? window : this);
