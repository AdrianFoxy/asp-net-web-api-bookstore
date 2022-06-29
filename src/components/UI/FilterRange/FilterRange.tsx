import React, {FC} from 'react';
import styles from "./FilterRange.module.scss"

interface FilterRange {
    min: number
    max: number
    onChangeMin: (e: any) => void
    onChangeMax: (e: any) => void
    onBlurMinPrice: (e: any) => void
    onBlurMaxPrice: (e: any) => void
}

const FilterRange: FC<FilterRange> = ({min, max, onChangeMin, onChangeMax, onBlurMinPrice, onBlurMaxPrice}) => {
    return (
        <div className={styles.range}>
            <input type="range" min={0} max={1000} value={min} onChange={onChangeMin} onBlur={onBlurMinPrice}/>
            <input type="range" min={0} max={1000} value={max} onChange={onChangeMax} onBlur={onBlurMaxPrice}/>
        </div>
    );
};

export default FilterRange;