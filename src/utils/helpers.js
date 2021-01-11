export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(number/100);
    return newNumber;
}   

/**This function allows us to display all type of property there are in an array of object */
export const getUniqueValues = (array, type) => {
    let arrType = array.map(item => item[type]);
    if (type === 'colors'){
        arrType = arrType.flat()
    }
    //Since set is an data type that requires no duplication, we use it eliminate duplication
    return['all', ...new Set(arrType)]
}
