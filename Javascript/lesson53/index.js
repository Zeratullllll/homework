// Задание 1.
// Дан массив пользователей:
"use strict";
const users = [
  { name: "Alex", age: 24, isAdmin: false },
  { name: "Bob", age: 13, isAdmin: false },
  { name: "John", age: 31, isAdmin: true },
  { name: "Jane", age: 20, isAdmin: false },
];

// Добавьте в конец массива двух пользователей:
// { name: 'Ann', age: 19, isAdmin: false },
// { name: 'Jack', age: 43, isAdmin: true }

users.push({ name: "Ann", age: 19, isAdmin: false });
users.push({ name: "Jack", age: 43, isAdmin: true });

console.log(users);
// Задание 2.
// Используя массив пользователей users из предыдущего задания, напишите функцию getUserAverageAge(users), которая возвращает средний возраст пользователей.

function getUserAverageAge(users) {
  let sum = 0;
  users.forEach((obj) => {
    sum += obj.age;
  });
  return sum / users.length;
}

console.log(getUserAverageAge(users));

// Задание 3.
// Используя массив пользователей users из предыдущего задания, напишите функцию getAllAdmins(users), которая возвращает массив всех администраторов.

function getAllAdmins(users) {
  const admins = [];
  users.forEach(function (element) {
    if (element.isAdmin) {
      admins.push(element);
    }
  });
  return admins;
}
console.log(getAllAdmins(users));

// Задание 4.
// Напишите функцию first(arr, n), которая возвращает первые n элементов массива. Если n == 0, возвращается пустой массив [], если n == undefined, то возвращается массив с первым элементом.

function first(arr, n) {
  if (n > arr.length) {
    console.error("Второй аргумент не может быть больше длины массива");
    return undefined;
  }
  if (n === 0) {
    return [];
  }
  if (n === undefined) {
    return [arr[0]];
  }
  const array = [];
  for (let index = 0; index < n; index++) {
    array.push(arr[index]);
  }
  return array;
}
const arr = [23, 123, 423, 32, 545];
console.log(first(arr, 4));
