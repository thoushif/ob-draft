import React, { ReactElement, useContext, useState, useEffect } from 'react'
import { UserPositionContext } from '../context/UserPositionProvider';
import { SpaceContext } from '../context/SpaceProvider';
import './space.css';
import { useParams } from 'react-router-dom';


const Space = (): ReactElement => {

  const { size, capacity } = useContext(SpaceContext);
  const { spaceId } = useParams<{ spaceId: string }>();
  const [spaceLoading, setSpaceLoading] = useState(true)
  const [allUsers, setAllusers] = useState<any>([])

  const [spaceLoadingFailed, setSpaceLoadingFailed] = useState(false)

  const [jiggleOnce, setJiggleOnce] = useState(false);
  const userPosition = useContext(UserPositionContext);
  const handleMouseDown = (i: number, j: number) => {

    console.log("mouse clicked her", i, j);
    userPosition?.setPosition({ x: i, y: j });
  };

  const loadSpace = async () => {
    // const allUsers = await databases.listDocuments(
    //   DATABASE_ID, // databaseId
    //   COLLECTION_ID // collectionId
    // );
    // setAllusers(allUsers?.documents);
    // const currentUser = allUsers.documents.find(doc => doc.$id === userId);
    // if (!currentUser) {
    //   console.error("User not found");
    //   setSpaceLoadingFailed(true);
    //   return;
    // }
    // const position = currentUser.position;


    // console.log("position", position);

    // userPosition?.setPosition({ x: parseInt(position[0]), y: parseInt(position[1]) });
    // setSpaceLoading(false);
  }
  useEffect(() => {


    loadSpace();
    console.log("trying to subscribe to databases.67895fec00321e95d069.collections.678ae9860036891d08fe.documents.678ae9fc0030b5fd34a1")
    // console.log("trying to subscribe to databases.67895fec00321e95d069.collections.678ae9860036891d08fe.documents.678ae9fc0030b5fd34a1")
    // let unsubscribe: any;
    // try {
    //   unsubscribe = client.subscribe('databases.67895fec00321e95d069.collections.678ae9860036891d08fe.documents.678ae9fc0030b5fd34a1', response => {
    //     // Log when a new file is uploaded
    //     console.log(response);
    //   });
    //   console.log("subscribed to databases.*.collections.*.documents.*", unsubscribe)
    // } catch (error: any) {
    //   console.log("error subscribing to databases.*.collections.*.documents.*", error)
    // }


    // // Cleanup subscription on component unmount
    // return () => unsubscribe();
  }, []);


  useEffect(() => {
    if (jiggleOnce) {
      const timer = setTimeout(() => setJiggleOnce(false), 500); // Reset after animation duration
      return () => clearTimeout(timer);
    }
  }, [jiggleOnce]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      let newPositionX: number = userPosition?.position?.x || 0;
      let newPositionY: number = userPosition?.position?.y || 0;
      switch (event.key) {
        case 'ArrowUp':
          if ((userPosition?.position?.x ?? 0) > 0) {
            newPositionX = Math.max((userPosition?.position?.x ?? 0) - 1, 0);
            userPosition?.setPosition?.((prev: any) => ({ ...prev, x: newPositionX }));
          } else {
            setJiggleOnce(true);
          }
          break;
        case 'ArrowDown':
          if ((userPosition?.position?.x ?? 0) < size - 1) {
            newPositionX = Math.min((userPosition?.position?.x ?? 0) + 1, size - 1);
            userPosition?.setPosition?.((prev: any) => ({ ...prev, x: newPositionX }));
          } else {
            setJiggleOnce(true);
          }
          break;
        case 'ArrowLeft':
          if ((userPosition?.position?.y ?? 0) > 0) {
            newPositionY = Math.max((userPosition?.position?.y ?? 0) - 1, 0);
            userPosition?.setPosition?.((prev: any) => ({ ...prev, y: newPositionY }));
          } else {
            setJiggleOnce(true);
          }
          break;
        case 'ArrowRight':
          if ((userPosition?.position?.y ?? 0) < size - 1) {
            newPositionY = Math.min((userPosition?.position?.y ?? 0) + 1, size - 1);
            userPosition?.setPosition?.((prev: any) => ({ ...prev, y: newPositionY }));
          } else {
            setJiggleOnce(true);
          }
          break;
        default:
          break;
      }
      console.log("updating position to", newPositionX, newPositionY)
      // const result = await databases.updateDocument(
      //   DATABASE_ID, // databaseId
      //   COLLECTION_ID, // collectionId
      //   userId!, // documentId
      //   { position: [newPositionX.toString(), newPositionY.toString()] },

      //   ['read("any")'] // permissions (optional)
      // );
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [userPosition, size]);

  const grid = Array.from({ length: size }, () => Array.from({ length: size }, () => 0));

  return (
    <>
      {spaceLoading ? "Loading" : (
        <div>
          <h2 className="text-xl font-semibold">Users List</h2>
          <ul>
            {allUsers.map((user: any) => (
              <li key={user.$id} className={user.$id === userId ? 'font-bold' : ''}>
                {user.name} - Position: ({user.position[0]}, {user.position[1]})
              </li>
            ))}
          </ul>
          <h1 className="text-2xl font-bold">Space - {capacity}</h1> {userPosition?.position.x} - {userPosition?.position.y}
          {JSON.stringify(userId)}
          <div className={`grid gap-0.5 ${jiggleOnce ? 'animate-shake' : ''}`} style={{ gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))` }}>
            {grid.map((row, i) => (
              row.map((cell, j) => {
                const userAtPosition = allUsers.find((user: any) => parseInt(user.position[0]) === i && parseInt(user.position[1]) === j);
                const isCurrentUser = userAtPosition?.$id === userId;
                const colors = ['bg-red-200', 'bg-blue-200', 'bg-yellow-200', 'bg-purple-200', 'bg-pink-200'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                const cellColor = isCurrentUser ? 'bg-green-500' : userAtPosition ? randomColor : 'bg-white';
                return (
                  <>
                    <div
                      key={`${i}-${j}`}
                      className={`w-5 h-5 ${cellColor} border border-gray-500`}
                      onMouseDown={() => handleMouseDown(i, j)}
                    ></div>
                  </>
                );
              })
            ))}
          </div>

        </div>
      )}
    </>
  );
}

export default Space;
