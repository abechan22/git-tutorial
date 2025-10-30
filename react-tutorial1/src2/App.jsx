import React, { useState } from 'react';

const images = [
  {
    src: '/images/pic1.jpg',
    alt: 'Closeup of a human eye',
  },
  {
    src: '/images/pic2.jpg',
    alt: 'Rock that looks like a wave',
  },
  {
    src: '/images/pic3.jpg',
    alt: 'Purple and white pansies',
  },
  {
    src: '/images/pic4.jpg',
    alt: "Section of wall from a pharoah's tomb",
  },
  {
    src: '/images/pic5.jpg',
    alt: 'Large moth on a leaf',
  },
];

export default function App() {
  // 1. 現在表示中の画像 (オブジェクト) を管理するState
  //    初期値として配列の最初の画像を設定
  const [currentImage, setCurrentImage] = useState(images[0]);

  // 2. 画像が暗くなっているか (Darken/Lighten) を管理するState
  //    初期値はfalse (明るい)
  const [isDarkened, setIsDarkened] = useState(false);

  // 3. サムネイルがクリックされたときに呼び出されるハンドラ
  const handleThumbnailClick = (image) => {
    // 表示する画像を、クリックされた画像のオブジェクトに更新
    setCurrentImage(image);
  };

  // 4. Darken/Lightenボタンがクリックされたときに呼び出されるハンドラ
  const handleDarkenClick = () => {
    // isDarkenedの値を反転させる (true -> false, false -> true)
    setIsDarkened(!isDarkened);
  };

  // 5. isDarkenedの状態に基づいて、オーバーレイのスタイルを動的に決定
  const overlayStyle = {
    backgroundColor: isDarkened ? 'rgba(0, 0, 0, 0.5)' : 'rgba(244, 232, 232, 0)',
    // (オプション: スムーズな切り替えのためのトランジション)
    transition: 'background-color 0.3s ease',
  };

  return (
    <>
      <h1>Image gallery example</h1>
      <div className="full-img">
        <img
          className="displayed-img"
          // Stateに保存されている画像のsrcとaltを使用
          src={currentImage.src}
          alt={currentImage.alt}
        />
        {/* 6. 動的に計算されたスタイルを適用 */}
        <div className="overlay" style={overlayStyle}></div>
        
        {/* 7. ボタンクリック時にハンドラを呼び出し */}
        <button className="dark" onClick={handleDarkenClick}>
          {/* 8. isDarkenedの状態に応じてボタンのテキストを変更 */}
          {isDarkened ? 'Lighten' : 'Darken'}
        </button>
      </div>

      <div className="thumb-bar">
        {/* 9. images配列を .map() でループ処理し、各画像に対応する<img>を生成 */}
        {images.map((image) => (
          <img
            // Reactがリストを効率的に管理するために 'key' が必要
            key={image.src} 
            src={image.src}
            alt={image.alt}
            // 10. クリック時に、その画像のオブジェクトを渡してハンドラを呼び出し
            onClick={() => handleThumbnailClick(image)}
            // (オプション: 選択中のサムネイルをわかりやすくする)
            className={currentImage.src === image.src ? 'active-thumbnail' : ''}
          />
        ))}
      </div>
    </>
  );
}