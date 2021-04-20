import { Box, Slider, Typography } from "@material-ui/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebouncedCallback } from "use-debounce/lib";
import styles from '../css/sliderItem.module.css';

const defaultSilderItem = {
    style: '',
    defaultValue: 1,
    step: 1,
    min: 1,
    max: 10,
    marks: [],
    valueLabelDisplay: 'auto',
    rangeMode: false,
    rangeValue: [],
    getSliderValue: (value) => (value),
    beforeChangeFunc: null,
    afterChangeFunc: null,
}

const SliderItem = ({ label, handleSliderValueChange, containerStyles, sliderOption = {
    ...defaultSilderItem
} }) => {

    const [value, setValue] = useState(sliderOption.rangeMode ? sliderOption.rangeValue : sliderOption.defaultValue)

    const { t } = useTranslation("common");

    const handleChange = (event, value) => {
        handleSliderValueChange(value);
        if (sliderOption.afterChangeFunc) sliderOption.afterChangeFunc();
    }

    const debounceChange = useDebouncedCallback(handleChange, 200)


    return (<Box className={`${styles.sliderContainer} ${containerStyles}`}>
        <Typography>{t(`${label}`)}</Typography>
        <Slider className={sliderOption.style}
            value={value}
            valueLabelDisplay={sliderOption.valueLabelDisplay}
            getAriaValueText={sliderOption.getSliderValue}
            min={sliderOption.min}
            max={sliderOption.max}
            marks={sliderOption.marks}
            onChange={(event, value) => {
                setValue(value)
                if (sliderOption.beforeChangeFunc) sliderOption.beforeChangeFunc();
                debounceChange.callback(event, value)
            }} />
    </Box>)
}

export { defaultSilderItem };
export default SliderItem;