var themeOptionArr = {
			typography: '',
			version: '',
			layout: '',
			primary: '',
			headerBg: '',
			navheaderBg: '',
			sidebarBg: '',
			sidebarStyle: '',
			sidebarPosition: '',
			headerPosition: '',
			containerLayout: '',
			direction: '',
		};
/* Cookies Function */
function setCookie(cname, cvalue, exhours)
	{
		var d = new Date();
		var minutes = 1000*60;
		var hours = minutes*60;
		var days = hours*24;
		/* d.setTime(d.getTime() + (30*60*1000)); 30 Minutes */
		d.setTime(d.getTime() + days);  /* 1days */
		var expires = "expires="+ d.toString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
function getCookie(cname)
	{
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
function deleteCookie(cname)
	{
		var d = new Date();
		d.setTime(d.getTime() + (1)); // 1/1000 second
		var expires = "expires="+ d.toString();
		//document.cookie = cname + "=1;" + expires + ";path=/";
		document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"+";path=/";
	}
function deleteAllCookie(reload = true)
	{
		jQuery.each(themeOptionArr, function(optionKey, optionValue) {
				deleteCookie(optionKey);
		});
		if(reload){
			location.reload();
		}
	}
/* Cookies Function END */
(function($) {
	"use strict"
	var direction =  getUrlParams('dir');
	var theme =  getUrlParams('theme');
	/* Dz Theme Demo Settings  */
	var dezThemeSet1 = {
		typography: "poppins",
		version: "light",
		layout: "vertical",
		primary: "color_5",
		headerBg: "color_5",
		navheaderBg: "color_1",
		sidebarBg: "color_1",
		sidebarStyle: "mini",
		sidebarPosition: "static",
		headerPosition: "fixed",
		containerLayout: "full",
		direction: direction
	};
	var dezThemeSet2 = {
		typography: "poppins",
		version: "dark",
		layout: "vertical",
		primary: "color_14",
		headerBg: "color_1",
		navheaderBg: "color_8",
		sidebarBg: "color_8",
		sidebarStyle: "full",
		sidebarPosition: "fixed",
		headerPosition: "fixed",
		containerLayout: "full",
		direction: direction
	};
	var dezThemeSet3 = {
		typography: "poppins",
		version: "light",
		layout: "vertical",
		primary: "color_2",
		headerBg: "color_1",
		navheaderBg: "color_2",
		sidebarBg: "color_2",
		sidebarStyle: "full",
		sidebarPosition: "fixed",
		headerPosition: "fixed",
		containerLayout: "full",
		direction: direction
	};
	var dezThemeSet4 = {
		typography: "poppins",
		version: "dark",
		layout: "vertical",
		primary: "color_7",
		headerBg: "color_1",
		navheaderBg: "color_7",
		sidebarBg: "color_7",
		sidebarStyle: "compact",
		sidebarPosition: "fixed",
		headerPosition: "fixed",
		containerLayout: "full",
		direction: direction
	};
	var dezThemeSet5 = {
		typography: "poppins",
		version: "light",
		layout: "vertical",
		primary: "color_4",
		headerBg: "color_1",
		navheaderBg: "color_4",
		sidebarBg: "color_4",
		sidebarStyle: "icon-hover",
		sidebarPosition: "fixed",
		headerPosition: "fixed",
		containerLayout: "full",
		direction: direction
	};
	function themeChange(theme, direction){
		var themeSettings = {};
		themeSettings = eval('dezThemeSet'+theme);
		themeSettings.direction = direction;
		dezSettingsOptions = themeSettings; /* For Screen Resize */
		new dezSettings(themeSettings);
		setThemeInCookie(themeSettings);
	}
	function setThemeInCookie(themeSettings)
	{
		jQuery.each(themeSettings, function(optionKey, optionValue) {
			setCookie(optionKey,optionValue);
		});
	}
	function setThemeLogo() {
		var logo = getCookie('logo_src');
		var logo2 = getCookie('logo_src2');
		if(logo != ''){
			jQuery('.nav-header .logo-abbr').attr("src", logo);
		}
		if(logo2 != ''){
			jQuery('.nav-header .logo-compact, .nav-header .brand-title').attr("src", logo2);
		}
	}
	function setThemeOptionOnPage()
	{
		jQuery.each(themeOptionArr, function(optionKey, optionValue) {
			var optionData = getCookie(optionKey);
			themeOptionArr[optionKey] = (optionData != '')?optionData:dezSettingsOptions[optionKey];
		});
		dezSettingsOptions = themeOptionArr;
		new dezSettings(dezSettingsOptions);
		setThemeLogo();
	}
	jQuery(document).on('click', '.dz_theme_demo', function(){
		var demoTheme = jQuery(this).data('theme');
		themeChange(demoTheme, 'ltr');
	});
	jQuery(document).on('click', '.dz_theme_demo_rtl', function(){
		var demoTheme = jQuery(this).data('theme');
		themeChange(demoTheme, 'rtl');
	});
	jQuery(window).on('load', function(){
		if(theme != undefined){
			themeChange(theme, 'ltr');
		}
		/* Set Theme On Page From Cookie */
		setThemeOptionOnPage();
	});
})(jQuery);