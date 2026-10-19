(() => {
  'use strict';
  const dialog=document.getElementById('image-viewer');
  const image=document.getElementById('viewer-image');
  const title=document.getElementById('viewer-title');
  const scroller=dialog.querySelector('.viewer-scroll');
  const zoom=document.getElementById('viewer-zoom');
  let opener=null;
  function openImage(button){
    opener=button;
    title.textContent=button.dataset.title||'作品大图';
    image.src='assets/'+button.dataset.full;
    image.alt=title.textContent;
    scroller.classList.remove('actual-size');
    zoom.setAttribute('aria-pressed','false');
    zoom.textContent='原尺寸查看';
    dialog.showModal();
    document.body.classList.add('viewer-open');
    scroller.scrollTop=0;scroller.scrollLeft=0;
    document.getElementById('viewer-close').focus();
  }
  document.querySelectorAll('[data-full]').forEach(button=>button.addEventListener('click',()=>openImage(button)));
  document.getElementById('viewer-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{document.body.classList.remove('viewer-open');opener?.focus({preventScroll:true});});
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
  zoom.addEventListener('click',()=>{const actual=scroller.classList.toggle('actual-size');zoom.setAttribute('aria-pressed',String(actual));zoom.textContent=actual?'适应窗口':'原尺寸查看';});
  image.addEventListener('error',()=>{title.textContent='图片暂时无法加载，请关闭后重试';});

  const tabs=[...document.querySelectorAll('[data-tab]')];
  function selectTab(tab,focus=false){
    tabs.forEach(item=>{const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;document.getElementById('panel-'+item.dataset.tab).hidden=!active;});
    if(focus)tab.focus();
  }
  tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',event=>{let target=index;if(event.key==='ArrowRight')target=(index+1)%tabs.length;else if(event.key==='ArrowLeft')target=(index-1+tabs.length)%tabs.length;else if(event.key==='Home')target=0;else if(event.key==='End')target=tabs.length-1;else return;event.preventDefault();selectTab(tabs[target],true);});});

  const videos=[...document.querySelectorAll('video')];
  videos.forEach(video=>video.addEventListener('play',()=>videos.forEach(other=>{if(other!==video)other.pause();})));
  document.querySelectorAll('[data-play]').forEach(button=>{const video=document.getElementById(button.dataset.play);button.addEventListener('click',async()=>{if(!video.paused){video.pause();return;}try{await video.play();}catch{button.textContent='请使用播放器中的播放按钮';}});video.addEventListener('play',()=>button.innerHTML='暂停播放 <span>Ⅱ</span>');video.addEventListener('pause',()=>button.innerHTML='播放作品 <span>▶</span>');video.addEventListener('ended',()=>button.innerHTML='重新播放 <span>↻</span>');});

  const copyButton=document.getElementById('copy-email');
  const copyStatus=document.getElementById('copy-status');
  copyButton.addEventListener('click',async()=>{try{if(!navigator.clipboard)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText('iscynthia0805@gmail.com');copyStatus.textContent='邮箱已复制';}catch{copyStatus.textContent='请手动复制：iscynthia0805@gmail.com';}});

  const progress=document.querySelector('.read-progress span');
  const backTop=document.querySelector('.back-top');
  let scheduled=false;
  function updateProgress(){const height=document.documentElement.scrollHeight-innerHeight;const amount=height>0?Math.min(1,Math.max(0,scrollY/height)):0;progress.style.width=(amount*100)+'%';backTop.classList.toggle('visible',scrollY>700);scheduled=false;}
  addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(updateProgress);}},{passive:true});
  addEventListener('resize',updateProgress);updateProgress();
})();
