const container = document.querySelector("main");

/*
	{
		id, name, rate, age, 
		img_link, description, 
		favourite
	}
*/

const createCard = function (cat, parent) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("div");
  img.className = "card-pic";
  if (cat.img_link) {
    img.style.backgroundImage = `url(${cat.img_link})`;
  } else {
    img.style.backgroundImage = "url(img/cat.png)";
    img.style.backgroundSize = "contain";
    img.style.backgroundColor = "transparent";
  }

  const name = document.createElement("h3");
  name.innerText = cat.name;

  let like = "";
  like.onclick = () => {
    //....
    // cat.id
  };

  card.append(img, name);
  parent.append(card);
};

createCard({ name: "Вася", img_link: "" }, container);
createCard(
  {
    name: "Вася",
    img_link:
      "https://www.friendforpet.ru/api/sites/default/files/2022-01/%D0%BB%D0%B5%D0%B2%D0%B83_%D0%B0%D0%BB%D0%B5%D0%BA%D1%81.jpg",
  },
  container
);

// запрос на сервер
fetch("https://sb-cats.herokuapp.com/api/2/Peacemaker84/show")
  // ответ от сервера что такой запрос существует
  .then((res) => res.json())
  // получение результата
  .then((result) => {
    // console.log(result);
    if (result.message === "ok") {
      console.log(result.data);
      result.data.forEach(function (el) {
        createCard(el, container);
      });
    }
  });

const cat = {
  id: 14,
  name: "апапапаап",
  img_link:
    "https://documents.infourok.ru/b15649ae-78ff-40d2-810f-49e07e465ac8/0/image001.png",
};

// JSON.stringify(obj) - сделает из объекта строку
// JSON.parse(str) - сделает из строки объект (если внутри строки объек)

const addCat = function () {
  fetch("https://sb-cats.herokuapp.com/api/2/Peacemaker84/add", {
    method: "POST",
    headers: {
      // обязательно для POST/PUT/PATCH
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cat), // обязательно для POST/PUT/PATCH
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.message === "ok") {
        createCard(cat, container);
      }
    });
};

const popupBlock = document.querySelector(".popup-wrapper");

popupBlock
  .querySelector(".popup__close")
  .addEventListener("click", function () {
    popupBlock.classList.remove("active");
  });

document.querySelector("#add").addEventListener("click", function (e) {
  e.preventDefault();
  popupBlock.classList.add("active");
});

document.querySelector(".card-pic").addEventListener("click", function (e) {
  e.preventDefault();
  popupBlock.classList.add("active");
});
