import resultStyles from './Result.module.css';

let Result = (props) => {
    return (
        <div className={resultStyles.resultContainer}>
            <div className={resultStyles.resultWrapper}>
                <div className={resultStyles.resultPlacement}>
                    {props.car.placement}
                </div>
                <div className={resultStyles.resultImageContainer}>
                    <img src={props.car.image} alt="photo of car" />
                </div>
                <div className={resultStyles.resultDetailsContainer}>
                    <div className={resultStyles.resultTitle}>{props.car.title}</div>
                    <div className={resultStyles.resultDetailsWrapper}>
                        <div className={resultStyles.resultDetails}>
                            {props.car.details.map((detail, idx) => <div key={idx} className={resultStyles.resultDetail}><div>{detail.key}: {detail.value}</div></div>)}
                        </div>
                    </div>
                </div>
                <div className={resultStyles.actionWrapper}>
                    <div className={resultStyles.smallTitle}>*all times are estimates </div>
                    <div className={resultStyles.resultAction}>
                        <a href={props.car.link} target="_blank"><span className={resultStyles.linkFancy}>View</span></a>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default Result