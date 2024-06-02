export const flipCard = (elements) => {
    const { card, front, button } = elements;
    // console.log(button?.current)
    card.current?.classList.toggle('rotate-y-180');
    front.current?.classList.toggle('hide');
    button.current?.classList.toggle('rotate-y-0');
}