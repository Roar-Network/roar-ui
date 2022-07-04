export function getNumberLiteral(x: number): string{
    let n = 6;
    let lit = ["", "", "", "k", "k", "k", "M"]
    while(n > 2 && x / 10 ** n < 1)
      n--;
    
    let x_ast = x / 10 **n;
    let posDot = x_ast.toString().indexOf(".");
    let tempX = Number(x_ast.toString().substring(0, posDot > 0 ? posDot + 2 : x_ast.toString().length));
    return `${x < 10 ** 3 ? x : tempX}${lit[n] != "" ? lit[n] : ""}`;
}   

export function getRandom(): number{
    return Math.floor(Math.random() *  (99*10**6))
}

export function formatDate(published: string): string{
    let now = new Date();
    let date = new Date(published);

    let diffs = [
      now.getFullYear() - date.getFullYear(),
      now.getMonth() - date.getMonth(), 
      now.getDate() - date.getDate(),
      now.getHours() - date.getHours(),
      now.getMinutes() - date.getMinutes(),
      now.getSeconds() - date.getSeconds()
    ]; 

    let names = [
      (x: number) => `${x} year${x > 1 ? "s" : ""} ago`,
      (x: number) => `${x} month${x > 1 ? "s" : ""} ago`,
      (x: number) => `${x} day${x > 1 ? "s" : ""} ago`,
      (x: number) => `today at ${date.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}:${date.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`,
      (x: number) => `${x} minute${x > 1 ? "s" : ""} ago`,
      (x: number) => `${x} second${x > 1 ? "s" : ""} ago`
    ]

    let index = 0;
    while (diffs[index] == 0 && index < diffs.length - 1) 
      index++;
    return  names[index](diffs[index]);
}