import { Card } from "./Card";
import React, { useEffect, useRef, useState } from "react";
import { useGifData } from "../functions/FetchContent";

export function StartGame() {
  const clickedIds = useRef([]);
  const highestScore = useRef(0);
  let { imageURLs, error, loading } = useGifData();
  const [images, setImages] = useState(null);

  useEffect(() => {
    if (imageURLs != null) {
      setImages(imageURLs);
    }
  }, [imageURLs]);

  function handleClick(id) {
    if (!clickedIds.current.includes(id)) {
      clickedIds.current.push(id);
    } else {
      highestScore.current = clickedIds.current.length;
      clickedIds.current = [];
      alert("Clicked Twice");
    }
    setImages(shuffle(images));
  }

  if (error) return <p>Something went wrong...</p>;
  if (loading) return <p>Loading...</p>;

  return (
    images && (
      <div className="flex flex-col text-center gap-8 ">
        <h1 className="text-2xl font-semibold">
          {`Current Score : ${clickedIds.current.length}`}
          <br />
          {`Highest Score : ${highestScore.current}`}
        </h1>

        <div className="flex flex-wrap justify-around gap-8">
          {images.slice(0, 10).map((imgObj) => {
            return (
              <Card
                data={imgObj}
                key={imgObj.id}
                clicked={() => {
                  return handleClick(imgObj.id);
                }}
              />
            );
          })}
        </div>
      </div>
    )
  );
}

function shuffle(array) {
  let currentIndex = array.length;
  let newArray = [...array];

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }
  return newArray;
}
