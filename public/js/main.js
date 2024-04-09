let burger = document.querySelector('.burger')
let menu = document.querySelector('.header_menu')


burger.onclick = () => {
    burger.classList.toggle('active')
    menu.classList.toggle('active')
    if (menu.classList.contains('active')) {
        let screen_height = window.screen.height
        menu.querySelector('ul').style.height = `${screen_height - 80}px`
    } else {
        menu.querySelector('ul').style.height = `auto`
    }
}
window.onresize = () => {
    if (menu.classList.contains('active')) {
        let screen_height = window.screen.height
        menu.querySelector('ul').style.height = `${screen_height - 80}px`
    } else {
        menu.querySelector('ul').style.height = `auto`
    }
}

let copy_code = document.querySelectorAll('.code_copy')

if (copy_code.length > 0) {
    copy_code.forEach(btn => {
        btn.onclick = () => {
            let copy_text = btn.parentElement.querySelector('ol')
            let text = copy_text.innerText || copy_text.textContent;
            let storage = document.createElement("input");
            document.body.appendChild(storage);
            storage.setAttribute("id", "storage");
            document.getElementById("storage").value = text;
            storage.select();
            document.execCommand("copy");
            document.body.removeChild(storage);
            btn.parentElement.querySelector('.code_copied').style.opacity = 1;
            setTimeout(fadeOut, 500);

            function fadeOut() {
                btn.parentElement.querySelector('.code_copied').style.opacity = 0.5;
                setTimeout(() => { btn.parentElement.querySelector('.code_copied').style.opacity = 0; }, 300);
            }

        }
    })
}




images = document.querySelectorAll('.main_content img')
images.forEach(img => {
    img.onclick = () => {
        let image = img.src
        let big_img_popup = document.createElement("div");
        document.body.appendChild(big_img_popup);
        big_img_popup.setAttribute("class", "big_img_popup");
        let big_img = document.createElement("img");
        big_img_popup.appendChild(big_img)
        big_img.setAttribute("src", image)
        big_img_popup.onclick = () => {
            big_img_popup.remove()
        }
    }

})


let to_top = document.querySelector('.to_top')
to_top.onclick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}



let slider = document.querySelector('.main_slider')

if (slider) {
    var s = tns({
        container: '.main_slider',
        items: 1,
        slideBy: 'page',
        controlsText: ["", ""],
        nav: false,
        mouseDrag: true,
        responsive: {
            904: {
                items: 4
            },
            740: {
                items: 3
            },
            460: {
                items: 2
            }

        },
        autoplay: true,
        autoplayButtonOutput: false
    });
}