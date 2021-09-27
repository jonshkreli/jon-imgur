export const Header = ({title, user, titleLink}) => {


    return <div className={"header"}>
        <span className={"reddit"}> <a href="/subreddits">reddit</a> </span>
        <span className={"title"}> <a href={titleLink}>{title}</a> </span>
        {user?<span className={"user"}>by <a href="#">{user}</a> </span>: ""}
    </div>
}
