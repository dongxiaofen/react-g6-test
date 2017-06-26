import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import styles from './index.less';
import Input from 'components/lib/input';
// import fullImg from 'imgs/companyHome/network/full.png';
// import exitFullImg from 'imgs/companyHome/network/exitFull.png';
// import resumeImg from 'imgs/companyHome/network/resume.png';
// import Select from 'components/lib/Select';
// const Option = Select.Option;

function LegendBar({ networkStore, resumeSvg, fullScreen, exitFull, messageStore}) {
  const { showFullScreen, totalLevel, selectLevel, currentLevel, showSearchInput} = networkStore;
  const handleFullScreen = () => {
    fullScreen();
    this.props.networkStore.toggleFullScreen();
  };
  const handleExitFull = () => {
    exitFull();
    this.props.networkStore.toggleFullScreen();
  };
  const levelOnchange = (val) => {
    selectLevel(val);
  };
  const createLayer = ()=> {
    const output = [];
    new Array(totalLevel).fill(1).forEach((tmp, idx)=> {
      const layerCss = idx === currentLevel - 1 ? styles.layerAct : styles.layer;
      output.push(
        <div key={idx}>
          <p className={layerCss} onClick={levelOnchange.bind(null, idx + 1)}>{`${idx + 1}层`}</p>
          <hr className={styles.hr}/>
        </div>
      );
    });
    return output;
  };
  const handleSearchChange = (evt) => {
    networkStore.updateValue('searchKey', evt.target.value);
  };
  const handleSearch = (evt) => {
    if (evt.keyCode === 13) {
      const searchKey = networkStore.searchKey;
      const nodesData = networkStore.currentNetwork.nodes;
      let searchNull = true;
      nodesData.map((node) => {
        if (searchKey !== '' && node.name === searchKey && node.category !== 0) {
          searchNull = false;
        }
      });
      if (searchNull) {
        messageStore.openMessage({type: 'info', content: '搜索无结果', duration: 1000});
      }else {
        networkStore.focusNode(networkStore.searchKey);
      }
    }
  };
  const showSearch = () => {
    networkStore.updateValue('showSearchInput', true);
  };
  const closeSearch = ()=> {
    networkStore.updateValue('showSearchInput', false);
  };
  console.log(showFullScreen, handleExitFull);
  const searchCss = showSearchInput ? `${styles.iconWrap} ${styles.searchShow}` : `${styles.iconWrap} ${styles.searchHide}`;
  return (
    <div className={styles.box}>
      <div className={searchCss} tabIndex="0">
        <p className={styles.iconContent}>
          <i className={`fa fa-search`} aria-hidden="true" onClick={showSearch}></i>
        </p>
        <Input
          id="search"
          type="text"
          placeholder="输入公司名/人名回车搜索"
          value={networkStore.searchKey}
          onChange={handleSearchChange}
          onKeyUp={handleSearch}
          className={styles.searchInput}
          autoComplete={false}
          onBlur={closeSearch}/>
      </div>
      <div className={`${styles.iconWrap} ${styles.opera}`}>
        <p className={styles.iconContent}>
          {
            !showFullScreen ?
            <i className="fa fa-expand" aria-hidden="true" title="全屏" onClick={handleFullScreen}></i>
            : <i className="fa fa-compress" aria-hidden="true" title="退出全屏" onClick={handleExitFull}></i>
          }
        </p>
        <hr className={styles.hr}/>
        <p className={styles.iconContent}>
          <i className="fa fa-external-link" aria-hidden="true" title="复原" onClick={resumeSvg}></i>
        </p>
      </div>
      <div className={`${styles.iconWrap} ${styles.layerWrap}`}>
        {createLayer()}
      </div>
    </div>
  );
}

LegendBar.propTypes = {
  foo: PropTypes.string,
};
export default inject('networkStore', 'messageStore')(observer(LegendBar));
