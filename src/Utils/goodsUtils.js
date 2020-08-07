import {v4 as uuidv4} from 'uuid';

export const newItemFromData = (data) => {
    return {
        id: uuidv4(),
        ...data,
    };
};

export const addNewItem = (data, goods) => {
    return [...goods, newItemFromData(data)];
};

export const removeElementById = (id, goods) => {
    return goods.filter((e) => e.id !== id);
};

export const getTotal = (goods) => {
    return goods.reduce((acc, item) => {
        return acc + parseFloat(item.weight);
    }, 0);
};


export const getToggleElement = (id, goods) => {
    console.log(goods, id);
    return goods.map((good) => {
        if (good.id === id) {
            good.selected = !good.selected;
        }
        return good;
    });
};

export const toggleSelectedGood = (selectedGoods, id) => {
    if (selectedGoods.indexOf(id) !== -1) {
        selectedGoods.splice(selectedGoods.indexOf(id), 1);
    } else {
        selectedGoods.push(id);
    }
    return selectedGoods;
};

export const getSubtotal = (goods, selectedGoods) => {
    return goods.reduce((acc, good) => {
        if (selectedGoods.indexOf(good.id) !== -1) {
            return acc + parseFloat(good.weight);
        }
        return acc;
    }, 0);
};

export const getEditElement = (goods, updatedGood ) => {
    return goods.map((good) => {
        if (good.id === updatedGood.id) {
            return updatedGood;
        } else {
            return good;
        }
    });
};

export const deleteSelectedElements = (goods, selectedGoods) => {
    for (let i = 0; i < goods.length; i++) {
        if (selectedGoods.indexOf(goods[i].id) !== -1) {
            goods.splice(i, 1);
        }
    }
    return goods;
};

export const removeSelectedGoodById = (arr, id) => {
    if (arr.indexOf(id) > -1) {
        arr.splice(arr.indexOf(id), 1);
    }
    return arr;
};
