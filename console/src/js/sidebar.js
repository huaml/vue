/* ========================================================================
 * sidebar
 * ======================================================================== */

$(function (){
  $("[data-toggle='sidebar']").on("click", function() {
    var that = $(this).closest(".view-frame");
    if(that.hasClass("view-frame-full")) {
      that.removeClass("view-frame-full").addClass("view-frame-mini");
      $(function () {
        $("[data-toggle='tooltip']").tooltip({container: "body"});
      });
    } else {
      that.removeClass("view-frame-mini").addClass("view-frame-full");
      $(function () {
        $("[data-toggle='tooltip']").tooltip("destroy");
      });
    }
  });

  $("[data-trans='trans']").on("click", function () {
    var indexVal = $(this).parent().index(),
        that = $(".sidebar-nav").eq(indexVal);
    that.toggleClass("sidebar-nav-active").siblings().removeClass("sidebar-nav-active");

    if (that.hasClass("sidebar-nav-active")) {
      var cHeight = document.documentElement.clientHeight,
          hHeight = $(".topbar").height();
          iHeight = $(".sidebar-icon").height();
          nHeight= $(".sidebar-title").height();
          nLength = $(".sidebar-nav").length;
          tHeight = nHeight * nLength;
          thisLi = $(this).next("ul").find("li").length;
          thisLiHeight = $(this).next("ul").find("li").height();
          thisHeight = thisLi * thisLiHeight;
          thatHeight = cHeight - hHeight - iHeight - tHeight;
          ulHeight = $(".sidebar-trans");

      if (thisHeight > thatHeight) {
        ulHeight.css("max-height", thatHeight);
      } else {
        ulHeight.css("max-height", thisHeight);
      }
    }
  });

  $("[data-toggle='navbar']").on("click", function () {
    $(this).closest(".view-frame-body").toggleClass("view-frame-navbar-collapse");
  });
  
});