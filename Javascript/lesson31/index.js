// Задача 1.
// Напишите функцию calculateFinalPrice, которая принимает базовую цену товара, процент скидки и налоговую ставку. Функция должна вычислять скидку, затем прибавлять налог и возвращать итоговую цену.

const calculateFinalPrice = (basePrice, discount, taxValue) =>
  basePrice * ((100 - discount) / 100) + taxValue * basePrice * ((100 - discount) / 100);

// Пример работы:
console.log(calculateFinalPrice(100, 10, 0.2)); // 108
console.log(calculateFinalPrice(100, 10, 0)); // 90

// Задача 2.
// Напишите функцию checkAccess, которая принимает имя пользователя и пароль. Если имя пользователя равно "admin" и пароль равен "123456", функция должна возвращать строку "Доступ разрешен", иначе — "Доступ запрещен".

function checkAccess(login, password) {
  if (login === "admin" && password === "123456") {
    return "Доступ разрешен";
  }
  return "Доступ запрещен";
}

console.log(checkAccess("admin", "123456"));
console.log(checkAccess("admin", "1234256"));

// Задача 3.
// Напишите функцию getTimeOfDay, которая принимает текущее время (число от 0 до 23) и возвращает строку:
// "Ночь" (с 0 до 5 часов),
// "Утро" (с 6 до 11 часов),
// "День" (с 12 до 17 часов),
// "Вечер" (с 18 до 23 часов).
// Если введённое значение не попадает в этот диапазон, возвращайте `"Некорректное время"`.

function getTimeOfDay(time) {
  if (time <= 5 && time >= 0) {
    return "Ночь";
  } else if (time <= 11 && time >= 6) {
    return "Утро";
  } else if (time <= 17 && time >= 12) {
    return "День";
  } else if (time <= 23 && time >= 18) {
    return "Вечер";
  } else {
    return "Некорректное время";
  }
}
console.log(getTimeOfDay(6));
console.log(getTimeOfDay(24));

// Задача 4.
// Напишите функцию findFirstEven, которая принимает два числа start и end и находит первое чётное число в указанном диапазоне.
// Если чётного числа в этом диапазоне нет, функция должна вернуть "Чётных чисел нет".

function findFirstEven(start, end) {
  if (start > end || (start === end && start % 2)) {
    return "Четных чисел нет";
  }
  return start % 2 ? start + 1 : start;
}

// Пример работы:
console.log(findFirstEven(1, 10)); // 2
console.log(findFirstEven(9, 9)); // "Чётных чисел нет"
