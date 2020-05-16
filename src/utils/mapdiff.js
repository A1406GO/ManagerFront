
function mapdiff(map1, map2, id) {
    if (!id)
        id = 'id';

    let result = {
        add: [],
        delete: [],
        update: []
    };

    map1.forEach((v, k, map) => {
        if (map2.has(k)) {
            let tm = map2.get(k);
            let flag = true;
            for (let prop of Object.keys(v)) {
                if (prop == id)
                    continue;
                if (v[prop] != tm[prop]) {
                    flag = false;
                    break;
                }
            }

            if (!flag) {
                result.update.push(tm);
            }
        }
        else {
            result.delete.push(v);
        }
    });

    map2.forEach((v, k, map) => {
        if (!map1.has(k)) {
            result.add.push(v);
        }
    });

    return result;
}

export default mapdiff;