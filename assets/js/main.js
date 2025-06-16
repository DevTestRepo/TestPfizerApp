$(document).ready(function () {
  $(".overlay").fadeIn('slow').delay(1500).fadeOut('slow');

  $('.owl-carousel').owlCarousel({
    loop: false,
    margin: 10,
    responsiveClass: true,
    nav: false,
    responsive: {
      0: {
        items: 2,
      },
      800: {
        items: 3,
      },
    }
  });


  // steps form
  var stepLinks = $('div > div.owl-stage-outer > div > div > li > a');
  var allWells = $('.setup-content');
  //hide well

  allWells.hide();

  //step link click event
  stepLinks.click(function (e) {
    e.preventDefault();
    //get link = #step-x
    var $target = $($(this).attr('href'));
    //get li parent
    var $item = $(this).closest('li');
    // check class $item that is active
    if (!$item.hasClass('disabled')) {
      //remove all class active from li
      stepLinks.closest('li').removeClass('active');
      //add class active to li
      $item.addClass('active');
      //hide all wells
      allWells.hide();
      //show target well
      $target.show();
    }
  });
  $('div > div.owl-stage-outer > div > div > li.active > a').trigger('click');
  $('.activate-step-2').on('click', function (e) {
    e.preventDefault();
    $('div > div.owl-stage-outer > div > div > li:eq(1)').removeClass('disabled');
    $('div > div.owl-stage-outer > div > div > li a[href="#step-2"]').trigger('click');
    // $(this).remove();
  });
  $('.activate-step-3').on('click', function (e) {
    $('div > div.owl-stage-outer > div > div > li:eq(2)').removeClass('disabled');
    $('div > div.owl-stage-outer > div > div > li a[href="#step-3"]').trigger('click');
    // $(this).remove();
  });

  $(".country-language ul li a,.pen-selector ul li a,.pen-selector2 ul li a").click(function (e) {
    e.preventDefault();
    $(this).parent().addClass("active").siblings().removeClass("active");
    if ($(".pen-selector ul li.active a").attr("data-pen") == "u2-pen") {
      $(".pen-selector2:eq(0)").removeClass("hide");
      $(".pen-selector2:eq(1)").addClass("hide");
    } else {
      $(".pen-selector2:eq(0)").addClass("hide");
      $(".pen-selector2:eq(1)").removeClass("hide");
    }
    let getCookieLang = $(".country-language ul li.active a").data("lang");
    let getCookiePen = $(".pen-selector ul li.active a").data("pen");
    let getCookiePenType = $(".pen-selector2 ul li.active a").data("type");
    setCookie("global_geno_lang", getCookieLang, 10);
    setCookie("global_geno_pen", getCookiePen, 10);
    setCookie("global_geno_pen_type", getCookiePenType, 10);
  });

  $(".miniquick a").click(function (e) {
    e.preventDefault();
    let penParam = getCookie("global_geno_pen");
    setCookie("global_geno_pen_type", "", 10);
    window.location.href = location.origin + "/global/genotropin/" + penParam + "/index.html";
  });

  $(document).ready(function () {
    let langParam = getCookie("global_geno_lang");
    let penParam = getCookie("global_geno_pen");
    let penTypeParam = getCookie("global_geno_pen_type");
    if (penTypeParam.length >= 5 ){
      // console.log(location.origin + "/global/genotropin/" + penParam + "/" + penTypeParam + "/index.html");
      // window.location.href = location.origin + "/global/genotropin/" + penParam + "/" + penTypeParam + "/index.html";
    }
    
    if (penTypeParam.length == 0) {
      // console.log(location.origin + "/global/genotropin/" + penParam + "/index.html");
      window.location.href = location.origin + "/global/genotropin/" + penParam + "/index.html";
    }

    if (penTypeParam.length <= 2) {
      // console.log(location.origin + "/global/genotropin" + "/index.html");
      // window.location.href = location.origin + "/global/genotropin" + "/changepen.html";
      $('div > div.owl-stage-outer > div > div > li:eq(0)').addClass('disabled');
      $('div > div.owl-stage-outer > div > div > li:eq(1)').addClass('disabled');
      $('div > div.owl-stage-outer > div > div > li:eq(2)').removeClass('disabled');
    }

  })

  $('.submit-form').click(function (e) {
    e.preventDefault();
    let langParam = getCookie("global_geno_lang");
    let penParam = getCookie("global_geno_pen");
    let penTypeParam = getCookie("global_geno_pen_type");
    // console.log(location.origin + "/global/genotropin/" + penParam + "/" + penTypeParam + "/index.html");

    window.location.href = location.origin + "/global/genotropin/" + penParam + "/" + penTypeParam + "/index.html";
  });
})
