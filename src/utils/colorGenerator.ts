const colorGenerator = (id?: any) => {
    const num = id?.slice(-6)

    var aRgbHex = num?.match(/.{1,2}/g) ?? '';
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return {
        rgb: `rgb(${aRgb[0]}, ${aRgb[1]}, ${aRgb[2]})`,
        rgba: `rgba(${aRgb[0]}, ${aRgb[1]}, ${aRgb[2]}, 0.3)`
    }
}

export default colorGenerator