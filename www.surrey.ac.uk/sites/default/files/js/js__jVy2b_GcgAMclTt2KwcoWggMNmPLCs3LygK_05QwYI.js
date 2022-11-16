"use strict";function InitialiseC4A(){var s=drupalSettings.surrey.surreyParagraphs.click4assistance.toolId,r=drupalSettings.surrey.surreyParagraphs.click4assistance.accountId;new C4A.Tools(s);C4A.Run(r)};
"use strict";const debounce=function(i){let e;return function(){const n=this,t=arguments;e&&window.cancelAnimationFrame(e),e=window.requestAnimationFrame(function(){i.apply(n,t)})}};;
"use strict";Drupal.behaviors.navigation={attach(e){const l={globals:{closeDropdownRef:null,navWrapper:null,currentlyOpen:{type:null,element:null,desktopButton:null},search:{id:"search",button:null,dropdown:null,isOpen:!1,input:null,hasSuggestions:!1,suggestions:[],currentTerm:null,suggestionsElement:document.getElementById("suggestions"),icons:document.getElementById("search-dropdown-icons"),submitButtonContainer:document.getElementById("search-dropdown-submit-button-container"),submitButton:document.getElementById("search-dropdown-submit-button"),form:document.getElementById("search-dropdown-form")},mobile:{id:"mobile",button:null,dropdown:null,isOpen:!1},desktop:{id:"desktop",buttons:null,isOpen:!1}},init(){l.globals.navWrapper=document.getElementById("global-nav"),l.globals.navWrapper.classList.contains("js-nav-processed")||(l.getElements(),l.addClickHandlers(),l.addCloseHandlers(),l.hideContainers(),l.addProcessedClass(),l.addSearchHandler())},addSearchHandler(){const e=l.globals.search["input"];e.addEventListener("input",function(e){if(0===this.value.length)return l.clearSuggestions(),l.adjustIconLinksVisibility("show"),void l.adjustSearchSubmitButtonVisibility("hide");l.adjustSearchSubmitButtonVisibility("show"),l.adjustIconLinksVisibility("hide"),this.timeout&&clearTimeout(this.timeout),this.timeout=setTimeout(()=>{l.globals.search.currentTerm=this.value,l.getSuggestions(this.value)},250)}),e.addEventListener("keyup",function(e){e.preventDefault(),"ArrowDown"!==e.key&&"Down"!==e.key||"ArrowDown"!==e.key&&"Down"!==e.key||l.globals.search.hasSuggestions&&l.globals.search.suggestionsElement.firstChild.focus()})},getSuggestions(e){e=encodeURIComponent(e),e=new Request("https://surrey-search.clients.uk.funnelback.com/s/suggest.json?collection=surrey-meta&show=5&partial_query=".concat(e));fetch(e).then(e=>{if(200===e.status)return e.json();throw new Error("Something went wrong on api server!")}).then(e=>{e=e.filter((e,n,o)=>o.indexOf(e)==n).slice(0,3);l.updateSuggestions(e)}).catch(e=>console.error(e))},submitForm(){l.globals.search.form.submit()},clearSuggestions(){l.globals.search.hasSuggestions=!1,l.globals.search.suggestionsElement.innerHTML=""},updateSuggestions(e){const{suggestionsElement:n,input:t}=l.globals.search;if(0!==e.length){let o="";e.forEach((e,n)=>{e='<a class="search-suggestion d-block text-white" href="/search?query='.concat(encodeURIComponent(e),'">').concat(e,"</a>");o+=e}),n.innerHTML=o,l.globals.search.hasSuggestions=!0;const s=document.querySelectorAll(".search-suggestion");s.forEach(e=>{e.addEventListener("keydown",function(e){["Up","Down","ArrowUp","ArrowDown"].includes(e.key)&&(e.preventDefault(),"ArrowDown"===e.key||"Down"===e.key?e.target.nextElementSibling&&e.target.nextElementSibling.focus():"ArrowUp"!==e.key&&"Up"!==e.key||(e.target.previousElementSibling?e.target.previousElementSibling.focus():(e=t.value["length"],t.setSelectionRange(e,e),t.focus())))})})}},adjustIconLinksVisibility(e){const n=l.globals.search["icons"];if(e&&n)switch(e){case"hide":n.classList.add("d-none");break;case"show":n.classList.remove("d-none")}},adjustSearchSubmitButtonVisibility(e){const n=l.globals.search["submitButtonContainer"];if(e&&n)switch(e){case"hide":n.classList.add("d-none");break;case"show":n.classList.remove("d-none")}},closeDropdownOnScrollPosition(){const e=document.querySelector(".search-container");window.scrollY>window.pageYOffset+e.getBoundingClientRect().top+e.offsetHeight&&l.closeOpenDropdown()},addScrollHandler(){window.addEventListener("scroll",l.globals.closeDropdownRef=debounce(l.closeDropdownOnScrollPosition))},removeScrollHandler(){window.removeEventListener("scroll",l.globals.closeDropdownRef)},addProcessedClass(){l.globals.navWrapper.classList.add("js-nav-processed")},getElements(){l.globals.desktop.buttons=document.getElementById("global-nav-inner").querySelectorAll(".nav-item > .nav-link"),l.globals.mobile.button=document.getElementById("mobile-nav-toggle"),l.globals.mobile.dropdown=document.getElementById("mobile-nav"),l.globals.search.button=document.getElementById("search-dropdown-button"),l.globals.search.dropdown=document.getElementById("js-search-container"),l.globals.search.input=document.getElementById("dropdownSearchTermInput")},addClickHandlers(){const{desktop:e,mobile:n,search:o}=l.globals;e.buttons.forEach(e=>{e.addEventListener("click",function(e){e.preventDefault();e=l.isSomethingElseOpen().isDesktopOpen;e&&this.parentNode===l.globals.currentlyOpen.element?l.closeOpenDropdown():(e&&this.parentNode!==l.globals.currentlyOpen.element&&l.closeOpenDropdown(),l.openDesktopDropdown(this))})}),n.button.addEventListener("click",function(e){e.preventDefault();e=l.isSomethingElseOpen().isMobileOpen;e?l.closeOpenDropdown():l.openMobileDropdown()}),o.button.addEventListener("click",function(e){e.preventDefault();e=l.isSomethingElseOpen().isSearchOpen;if(e)l.closeOpenDropdown();else{l.openSearchDropdown();const n=document.getElementById("dropdownSearchTermInput");n.focus()}}),o.submitButton.addEventListener("click",function(e){e.preventDefault(),o.form.submit()})},hideContainers(){const e=l.globals.navWrapper.querySelectorAll(".nav-container a");e.forEach(e=>{e.textContent.includes("Container")&&e.parentNode.classList.add("bodged-nav")})},addCloseHandlers(){document.addEventListener("keyup",e=>{"Escape"===e.key&&l.closeOpenDropdown()}),document.addEventListener("click",e=>{l.globals.navWrapper.contains(e.target)||l.closeOpenDropdown()})},openDesktopDropdown(e){var n=l.isSomethingElseOpen()["isSearchOpen"];n&&l.closeOpenDropdown(),e.parentNode.classList.add("nav-active"),e.setAttribute("aria-expanded",!0),l.globals.desktop.isOpen=!0,l.globals.currentlyOpen.element=e.parentNode,l.globals.currentlyOpen.desktopButton=e,l.globals.currentlyOpen.type=l.globals.desktop.id},openMobileDropdown(){var e=l.isSomethingElseOpen()["isSearchOpen"];e&&l.closeOpenDropdown(),l.globals.mobile.dropdown.classList.remove("d-none"),l.globals.mobile.button.classList.add("mobile-nav-open"),l.globals.mobile.button.setAttribute("aria-expanded",!0),l.globals.mobile.isOpen=!0,l.globals.currentlyOpen.element=l.globals.mobile.dropdown,l.globals.currentlyOpen.type=l.globals.mobile.id},openSearchDropdown(){var{isDesktopOpen:e,isMobileOpen:n}=l.isSomethingElseOpen();(e||n)&&l.closeOpenDropdown(),l.globals.search.dropdown.classList.add("nav-active"),l.globals.search.button.setAttribute("aria-expanded",!0),l.globals.search.isOpen=!0,l.addScrollHandler(),l.globals.currentlyOpen.element=l.globals.search.dropdown,l.globals.currentlyOpen.type=l.globals.search.id},closeOpenDropdown(){var e=l.globals.currentlyOpen["type"];if(e){switch(e){case l.globals.mobile.id:l.globals.currentlyOpen.element.classList.add("d-none"),l.globals.mobile.button.classList.remove("mobile-nav-open"),l.globals.mobile.button.setAttribute("aria-expanded",!1),l.globals.mobile.isOpen=!1;break;case l.globals.search.id:l.globals.currentlyOpen.element.classList.remove("nav-active"),l.globals.search.button.setAttribute("aria-expanded",!1),l.globals.search.isOpen=!1,l.removeScrollHandler();break;case l.globals.desktop.id:l.globals.currentlyOpen.element.classList.remove("nav-active"),l.globals.currentlyOpen.desktopButton.setAttribute("aria-expanded",!1),l.globals.desktop.isOpen=!1}l.globals.currentlyOpen={type:null,element:null,desktopButton:null}}},isSomethingElseOpen(e){var{desktop:n,mobile:o,search:t}=l.globals;return{isDesktopOpen:n.isOpen,isMobileOpen:o.isOpen,isSearchOpen:t.isOpen}}};l.init()}};;
