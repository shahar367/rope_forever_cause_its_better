const TrickPage = (trick) => {
    return (<div>
        <iframe
        title={trick.name}
        width="560"
        height="315"
        src={trick.link}
        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    </div>)
}

export default TrickPage;