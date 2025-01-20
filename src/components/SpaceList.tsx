import React, { useEffect } from 'react'
import { getActiveSpaces } from '../services/SpaceServices';
import { ISpace_Details } from '../types/interfaces';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
const OnlineIndicator = ({ isOnline }: { isOnline: boolean }) => (
    <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-300"}`} />
        <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
    </div>
)

const SpaceList = () => {

    const [spaces, setSpaces] = React.useState<ISpace_Details[]>([]);
    useEffect(() => {
        const fetchSpaces = async () => {
            const activeSpaces = await getActiveSpaces();
            setSpaces(activeSpaces);
        };
        fetchSpaces();
    }, [])
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* {JSON.stringify(spaces)} */}
            {spaces && spaces.map((space, index) => (
                <SpaceCard key={index} {...space} />
            ))}
        </div>
    )
}

export function SpaceCard({ name, description, online }: ISpace_Details) {
    return (
        <Card  >
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold">{name}</CardTitle>
                    <OnlineIndicator isOnline={online} />
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{description}</p>
            </CardContent>
            <CardFooter>
                <Button className="w-full" disabled={!online}>Join Space</Button>
            </CardFooter>
        </Card>
    )
}

export default SpaceList