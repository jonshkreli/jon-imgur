import {connect, useSelector} from "react-redux";
import {subredditAction} from "../actions/simpleAction";
import {useState} from "react";
import {AppBar, Dialog, DialogContent, IconButton, Toolbar} from "@mui/material";
import {ArrowDownward, ArrowUpward, Close} from "@mui/icons-material";

let Home = props => {

    const [modalContent, set_modalContent] = useState(undefined)
    let {gallery} = useSelector(state => state.simpleReducer)
    // console.log(subreddit)

    const onImageCardClick = ({id, title, link, description, images, ups, downs, score}) => {
        set_modalContent(<div className={"modal-content"}>
            <div className={"header modal-header"}>
                <div className={"title-container"}><h3>{title}</h3></div>
                <div className={"details-container"}>
                    <div className={"voting"}>
                        <div><span className={"ups-label"}> <ArrowUpward/> </span> {ups}</div>
                        <div><span className={"downs-label"}> <ArrowDownward/> </span> {downs}</div>
                    </div>
                    <div className={"score-container"}>{score}</div>
                </div>
            </div>

            <a className={"full-size-image-container"} href={images?.[0]?.link} target="_blank">
                <img src={images?.[0]?.link} alt=""/>
            </a>
            <p className={"description"}>{description || "No description"}</p>
        </div>)
    }

    const onModalClose = () => {
      set_modalContent(undefined)
    }

    return <div className={"container"}>
        {gallery ? gallery?.map(({id, title, link, description, images, ups, downs, score}) => {
            return <div key={id} className={"card"} onClick={() => onImageCardClick({id, title, link, description, images, ups, downs, score})}>
                <img className={"thumbnail"} src={images?.[0]?.link} alt=""/>
                <p>{description}</p>
            </div>
        }) : "Loading..."}

        <Dialog className={"full-data-modal"} {... {onClose: onModalClose, open: Boolean(modalContent), content: modalContent}}>
                <AppBar sx={{ position: 'relative' }} className={"app-bar-modal"}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={onModalClose} aria-label="close"> <Close/> </IconButton>
                        <div>Image details</div>
                    </Toolbar>
                </AppBar>
                {modalContent}
        </Dialog>
    </div>
}

const mapDispatchToProps = dispatch => ({
})

 Home = connect(null, mapDispatchToProps)(Home)

export default Home
