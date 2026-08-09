export function downloadEbook(bookTitle: string) {
    const element = document.createElement("a");
    
    const ebookContent = `Lorem ipsum dolor sit amet. Aut nemo sunt et voluptates facilis qui 
perspiciatis cumque ut molestiae dignissimos ut voluptatem omnis in 
corporis aperiam ut quia voluptatem? Cum eius incidunt ut porro vitae a 
minima eius et assumenda eaque rem atque magnam eos minus architecto est
 quia voluptates. Est quis facilis non laudantium necessitatibus non 
fugit voluptatem id harum officiis. 
Est deleniti tenetur eum 
asperiores itaque At iste veniam eos sunt dolor et magnam molestiae. Eum
 tenetur corrupti non maiores dolores rem commodi dolor ea consequatur 
fugiat? Qui minus beatae eum optio tenetur ex nihil voluptatem ut 
incidunt inventore nam libero earum est voluptates culpa sit illo odit. 
Ut veniam autem non veniam totam aut dolorem sequi qui quasi tenetur est
 doloribus reprehenderit et dolores quidem est deserunt vero. 
Aut
 maxime possimus est illo accusantium quo deserunt explicabo qui nulla 
architecto in molestiae asperiores id suscipit harum hic dolorum unde. 
Vel fuga quia est saepe nemo ut quia accusantium id eius sint eum vero 
galisum. Et vitae labore eum corrupti explicabo qui reprehenderit 
aspernatur aut sunt debitis non facere neque aut dolor consequuntur est 
quis dolorem`;

    const file = new Blob([ebookContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    
    const safeTitle = bookTitle
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "_")   
        .toLowerCase();
        
    element.download = `${safeTitle}.txt`;
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}