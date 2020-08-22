import React from 'react';
import { observable, action } from 'mobx';
import { useObserver,  } from 'mobx-react';
const size = 400;

class YourStore {
  @observable
  isResetData = false;
  @observable
  x = 0;
  @observable
  y = 0;

  @action
  setCoor = (x, y) => {
    this.x = x;
    this.y = y;
  }

  @action
  reset = (b) => {
    this.isResetData = b;
  }

  useTerrainData = () => {
    return useObserver(() => ({ // useObserver를 사용해서 리턴하는 값의 업데이트를 계속 반영한다
      isResetData : this.isResetData,
      x : this.x,
      y : this.y
    }))
  }
}

const yourStore = () => {
  return new YourStore();
}

export default yourStore;