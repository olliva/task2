# Описание ошибки

В коде встречается ошибка использования замыкания внутри цикла с передачей переменной индекса внутрь по ссылке.
```javascript
for (i = 0; i < 3; i++){
    var request = requests[i];
    var callback = function (error, result){
        responses[request] = result;
    }
}
```

Анонимная функция сохраняет ссылку на ``i``, и к моменту выполнения функции ``callback`` ``i`` будет равна ``3``.

Есть 2 варианта решения данной проблемы.

1. Скопировать значения ``i`` с помощью анонимной функции-обертки
        
    ```javascript
    for (i = 0; i < 3; i++){
        (function() {
            var request = requests[i];
            var callback = function (error, result){
                responses[request] = result;
            }
         })(i);
    }
    ```
        
2. Отказаться от использования циклов и решить задачу с помощью ``Promise``