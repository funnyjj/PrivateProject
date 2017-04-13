/*--String.prototype--*/
~function (pro) {
    //->queryURLParameter:get url parameter or hash
    function queryURLParameter() {
        var reg = /([^?=&#]+)=([^?=&#]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });

        //->HASH
        reg = /#([^?=&#]+)/g;
        this.replace(reg, function () {
            obj['HASH'] = arguments[1];
        });
        return obj;
    }

    //->formatTime:format time by template
    function formatTime(template) {
        template = template || '{0}年{1}月{2}日 {3}时{4}分{5}秒';
        var reg = /\d+/g,
            ary = this.match(reg);
        template = template.replace(/\{(\d+)\}/g, function () {
            var index = arguments[1],
                res = ary[index] || '00';
            res.length < 2 ? res = '0' + res : null;
            return res;
        });
        return template;
    }

    pro.formatTime = formatTime;
    pro.queryURLParameter = queryURLParameter;
}(String.prototype);

/*--NAV RENDER--*/
var navRender = (function () {
    var $menu = $('#menu'),
        $nav = $('#nav');
    var isBok = false;
    return {
        init: function () {
            $menu.tap(function () {
                if (isBok) {
                    $nav.css({
                        padding: '0',
                        height: 0
                    });
                    isBok = false;
                    return;
                }
                $nav.css({
                    padding: '.1rem 0',
                    height: '2.22rem'
                });
                isBok = true;
            });
        }
    }
})();
navRender.init();

/*--MATCH RENDER--*/
var matchRender = (function () {
    var $match = $('#match'),
        $supportLeft = null,
        $supportRight = null,
        $progress = null;

    var isSupport = false;

    function bindEvent() {
        var supportInfo = localStorage.getItem('supportInfo');
        if (supportInfo) {
            supportInfo = JSON.parse(supportInfo);
            if (supportInfo.flag) {
                isSupport = true;
                supportInfo.type == 1 ? $supportLeft.addClass('bg') : $supportRight.addClass('bg');
                return;
            }
        }

        $match.tap(function (e) {
            var tar = e.target,
                tarTag = tar.tagName,
                tarInn = parseFloat(tar.innerHTML);
            var $tar = $(tar);
            if (tarTag == 'DIV' && $tar.hasClass('support')) {
                if (isSupport === true) return;

                //->控制显示
                isSupport = true;
                $tar.addClass('bg').html(tarInn + 1);

                //->计算进度
                var numLeft = parseFloat($supportLeft.html()),
                    numRight = parseFloat($supportRight.html());
                $progress.css('width', (numLeft / (numLeft + numRight)) * 100 + '%');

                //->告诉服务器我支持的是谁
                $.ajax({
                    url: 'http://matchweb.sports.qq.com/kbs/teamSupport?mid=100000:1469151&type=' + $tar.attr('type'),
                    type: 'get',
                    dataType: 'jsonp'
                });

                //->存储到本地一份,只能支持一次
                var obj = {
                    flag: true,
                    type: $tar.attr('type')
                };
                localStorage.setItem('supportInfo', JSON.stringify(obj));//->本地存储只能存储字符串
            }
        });
    }

    //->bindHTML:bind data
    function bindHTML(matchInfo) {
        var template = $('#matchTemplate').html();
        var res = ejs.render(template, {matchInfo: matchInfo});
        $match.html(res);

        $supportLeft = $('#supportLeft');
        $supportRight = $('#supportRight');
        $progress = $('#progress');

        //->bind event
        bindEvent();
    }

    return {
        init: function () {
            //->send jsonp get data
            $.ajax({
                url: 'http://matchweb.sports.qq.com/html/matchDetail?mid=100000:1469151',
                type: 'get',
                dataType: 'jsonp',
                success: function (result) {
                    if (result && result[0] == 0) {
                        //->format data
                        result = result[1];
                        var matchInfo = result['matchInfo'];
                        matchInfo['leftSupport'] = result['leftSupport'];
                        matchInfo['rightSupport'] = result['rightSupport'];

                        //->bind html
                        bindHTML(matchInfo);
                    }
                }
            });
        }
    }
})();
matchRender.init();

/*--PLAYER--*/
var playerRender = (function () {
    var $player = $('#player'),
        $wrapper = $player.children('.wrapper');

    //->bindHTML:bind data
    function bindHTML(playerList) {
        $wrapper.html(ejs.render($('#playerTemplate').html(), {playerList: playerList})).css('width', playerList.length * 2.4 + .3 + 'rem');

        //->iscroll
        new IScroll('.player', {
            scrollbars: false,
            scrollX: true,
            scrollY: false
        });
    }

    return {
        init: function () {
            $.ajax({
                url: 'http://matchweb.sports.qq.com/html/matchStatV37?mid=100000:1469151',
                type: 'get',
                dataType: 'jsonp',
                success: function (result) {
                    if (result && result[0] == 0) {
                        result = result[1];
                        result = result['stats'];
                        var playerList = null;
                        $.each(result, function (index, item) {
                            if (item.type == 9) {
                                playerList = item.list;
                                return false;
                            }
                        });

                        //->bind html
                        bindHTML(playerList);
                    }
                }
            });
        }
    }
})();
playerRender.init();