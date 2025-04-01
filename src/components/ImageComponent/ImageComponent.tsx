import img from './starwars.jpeg'

interface MyComponentProps {
    imageUrl?: string;
}

const ImageComponent: React.FC<MyComponentProps> = () => {
    const style = {
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        width: '100%',
        height: '63vh',
    };

    return (
        <div style={style}></div>
    );
}

export default ImageComponent;