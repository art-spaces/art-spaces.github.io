window.onload = function () {
    var scroll = 2;
    var load = setInterval(timeFn, 1000);
    function timeFn() {
      scroll--;
      if (scroll == 0) {
        clearInterval(load);
        main_loading_lines.style.display = "none";
        main_content.style.opacity = "1";
        loading_main_progress.classList.add("hidden");
      }
    }
    // badge_close.onclick = function () {
    //   second_header.style.display = "none";
    //   post_container.style = "margin-top: 35px";
    //   main_user_info.style.display = "block";
    // }
  };
  mobileScroll(
      function (direction) {
          try {
              if (direction === 'down') {
                  document.querySelector('.em_body_navigation').classList.add('mini_ui_hidden');
              } else {
                  document.querySelector('.em_body_navigation').classList.remove('mini_ui_hidden');
              }
          } catch (err) {
          }
      }
  );
  function mobileScroll(fn) {
      var beforeScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
          fn = fn || function () {
          };
      window.addEventListener("scroll", function () {
          var afterScrollTop = document.documentElement.scrollTop || document.body.scrollTop,
              delta = afterScrollTop - beforeScrollTop;
          if (delta === 0) return false;
          fn(delta > 0 ? "down" : "up");
          beforeScrollTop = afterScrollTop;
      }, false);
  };