document.getElementById("drawButton").addEventListener("click", () => {
    const gifts = document.querySelectorAll(".gift");
    let currentIndex = 0;
    let speed = 400; // 初始速度（毫秒）
    let interval;
  
    // 開始輪流高亮顯示
    function highlightNext() {
      gifts.forEach((gift, index) => {
        gift.classList.toggle("highlight-border", index === currentIndex); // 僅應用邊框高亮
      });
      currentIndex = (currentIndex + 1) % gifts.length;
    }
  
    // 動態調整速度的函數
    function dynamicSpeedAdjust(duration) {
      const maxSpeed = 100; // 最快速度（毫秒）
      const minSpeed = 400; // 最慢速度（毫秒）
      const midTime = duration / 2; // 加速和減速的分界點
      const elapsed = Date.now() - startTime;
  
      if (elapsed < midTime) {
        // 前半段加速
        speed = Math.max(maxSpeed, minSpeed - (elapsed / midTime) * (minSpeed - maxSpeed));
      } else {
        // 後半段減速
        speed = Math.min(minSpeed, maxSpeed + ((elapsed - midTime) / midTime) * (minSpeed - maxSpeed));
      }
    }
  
    // 啟動輪詢，並動態調整速度
    const startTime = Date.now();
    const duration = 5000; // 總輪詢時間（毫秒）
    function startRoulette() {
      highlightNext();
      dynamicSpeedAdjust(duration);
      if (Date.now() - startTime < duration) {
        interval = setTimeout(startRoulette, speed);
      } else {
        // 停止輪詢並選擇最終獎品
        const randomIndex = Math.floor(Math.random() * gifts.length);
        gifts.forEach((gift, index) => {
          if (index === randomIndex) {
            gift.classList.add("highlight-border"); // 僅保留邊框高亮
            setTimeout(() => {
              // 顯示中獎訊息並移動到正中間
              gifts.forEach((gift, idx) => {
                if (idx !== randomIndex) gift.classList.add("fade-out");
              });
              setTimeout(() => {
                const selectedGift = gifts[randomIndex].innerHTML;
                document.getElementById("page2").innerHTML = `
                  <h1>恭喜小寶貝！你抽到：</h1>
                  <div class="selected">
                    ${selectedGift}
                  </div>
                `;
              }, 1000);
            }, 1000);
          } else {
            gift.classList.remove("highlight-border");
          }
        });
      }
    }
  
    startRoulette();
  });
  