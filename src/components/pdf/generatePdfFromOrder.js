import jsPDF from 'jspdf';


export const generatePDF = (orderDetails) => {
    const { orderId, status, orderInfo } = orderDetails;
    const { user, orderedItems, total } = orderInfo;
    const { name, city, street, postalCode } = user;
    let xPointer = 20;
    let yPointer = 20;
    var doc = new jsPDF('p', 'pt');
    doc.text(xPointer, yPointer, `Order# ${orderId}`);
    doc.text(200, yPointer, `Status: ${status}`);
    yPointer += 30;
    doc.text(xPointer, yPointer, `Ordered Items:  ${orderedItems.length}`)
    yPointer += 20;
    orderedItems.forEach(({ price, name, amount }, index) => {
        doc.text(xPointer, yPointer, `${name} x${amount} = $${amount * price}`)
        yPointer += 20;
    })
    yPointer +=  30;
    doc.text(xPointer, yPointer, `Total: $${total}`);
    yPointer = yPointer+30;
    doc.text(xPointer, yPointer, 'Address: ');
    yPointer += 20;
    doc.text(xPointer, yPointer, `${name},`)
    yPointer += 20;
    doc.text(xPointer, yPointer, `${street},`)
    yPointer += 20;
    doc.text(xPointer, yPointer, `${city},`)
    yPointer += 20;
    doc.text(xPointer, yPointer, `${postalCode}.`)
    doc.save(`${orderId}.pdf`)
}
