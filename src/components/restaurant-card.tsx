import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface RestaurantCardProps {
    restaurant: {
        id: number;
        name: string;
        coverImage: string;
        address: string;
        category?: { name: string } | null;
    };
}
export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const navigate = useNavigate(); 
    const onClick = () => {
        navigate(`/restaurant/${restaurant.id}`);
    }

    useEffect(() => {
        const img = new Image();
        img.src = restaurant.coverImage;
        img.onload = () => {
            setImageSrc(restaurant.coverImage);
            setImageLoaded(true);
        };
    }, [restaurant.coverImage]);

    return (
        <div onClick={onClick} className="flex flex-row md:flex-col w-full md:w-1/4 h-32 md:h-60 rounded-md overflow-hidden cursor-pointer">
            <div className="w-1/3 md:w-full h-full md:h-36 rounded-md">
                {imageLoaded ? (
                    <div style={{ backgroundImage: `url(${imageSrc})` }} className="h-full w-full bg-cover rounded-md"></div>
                ) : (
                    <div className="w-full h-full bg-gray-200 rounded-md"></div>
                )}
            </div>
            <div className="w-2/3 md:w-full p-2 flex flex-col">
                <span className="text-lg font-semibold">{restaurant.name}</span>
                <span className="text-sm text-gray-500">{restaurant.address}</span>
            </div>
        </div>
    );
};
