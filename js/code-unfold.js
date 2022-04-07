var CODE_MAX_HEIGHT=200,containers=[];
// 添加隐藏容器
function addCodeWrap(t){var i=t.wrap('<div class="js_highlight_container highlight-container"><div class="highlight-wrap"></div></div>').closest(".js_highlight_container"),n=$('\n    <div class="highlight-footer">\n      <a class="js_unfold_code_btn show-btn" href="javascript:;">展开代码<i class="fa fa-angle-down" aria-hidden="true"></i></a>\n    </div>\n    <a class="js_retract_code_btn hide-btn" href="javascript:;"><i class="fa fa-angle-up" aria-hidden="true"></i>收起代码</a>\n  ');
// 底部 "展开代码" 与 侧边栏 "收起代码"
return i.append(n),i}function codeUnfold(){$(".highlight").each((function(){
// 防止重复渲染
if(!0===this.__render__)return!0;this.__render__=!0;var t=$(this),i=$(this).outerHeight();if(i>CODE_MAX_HEIGHT){
// 添加展开&收起容器
var n=addCodeWrap(t,i);containers.push({$container:n,height:i,$hide:n.find(".js_retract_code_btn"),hasHorizontalScrollbar:this.scrollWidth>this.offsetWidth})}}))}
// 展开
$("body").on("click",".js_unfold_code_btn",(function(){$(this).closest(".js_highlight_container").addClass("on")})),
// 收起
$("body").on("click",".js_retract_code_btn",(function(){var t=$(this).closest(".js_highlight_container").removeClass("on"),i=$(window).scrollTop(),n=t.offset().top;$(this).css("top",0),i>n&&
// 设置滚动条位置
$("body, html").animate({scrollTop:t.offset().top-CODE_MAX_HEIGHT},600)})),
// 滚动事件，触发动画效果
$(window).on("scroll",(function(){var t=$(window).scrollTop(),i=[];for(let d=0;d<containers.length;d++){var n=containers[d],{$container:o,height:a,$hide:s,hasHorizontalScrollbar:e}=n;if(0===o.closest("body").length)
// 如果 $container 元素已经不在页面上, 则删除该元素
// 防止pjax页面跳转之后，元素未删除
continue;if(i.push(n),!o.hasClass("on"))continue;var r=o.offset().top,h=s.outerHeight(),c=parseInt(a-(e?17:0)-h);let _=parseInt(Math.min(Math.max(t-r,0),// 如果小于 0 ，则取 0
c));
// 根据 sin 曲线设置"收起代码"位置
var l=parseInt($(window).height()/2*Math.sin(_/c*90*(2*Math.PI/360)));s.css("top",Math.min(_+l,c))}containers=i}));