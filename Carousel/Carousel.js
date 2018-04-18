/**
 * 幻灯片组件
 * 
 * props说明：
 * 		width(Number):幻灯片宽度
 * 	   height(Number):幻灯片高度
 * 	     pages(Array):幻灯片内容
 * 	     time(Number):幻灯片切换的时间(毫秒)
 *
 * 幻灯片中如果希望实现动画可以在css中写样式，并在需要动画的标签上加上这个样式,如animate1
 */
class Carousel extends React.Component{
	constructor(props){
		super(props);
		let {width,height,pages,time} = this.props;
		this.state = {
			width:width ? width:500,
			height:height ? height:300,
			index:0,
			interval:null,
			time:time?time:3000,
			pages:pages ? pages:[
					{page:<div className='transition-all animate1' style={{background:'orange'}}><span>1</span></div>},
					{page:<div style={{background:'#E41F2B'}}>2</div>},
					{page:<div style={{background:'orange'}}>3</div>},
					{page:<div style={{background:'#E41F2B'}}>4</div>}
				 ]

		};
		this.beginRun = this.beginRun.bind(this);
		this.stopRun = this.stopRun.bind(this);
		this.setIndex = this.setIndex.bind(this);
		this.changeRun = this.changeRun.bind(this);
	}
	componentDidMount(){
		this.beginRun();
	}	
	beginRun(){
		let interval = setInterval(()=>{
			let {index,pages} = this.state;
			index = index + 1;
			if(index>=pages.length){
				index = 0;
			}
			this.setState({index});
		},4000);
		this.setState({interval});
	}
	stopRun(){
		let {interval} = this.state;
		clearInterval(interval);
	}
	setIndex(index,isClick){
		let {pages} = this.state;
		if(index>=pages.length){
				index = 0;
		}
		if(index<0){
				index = pages.length-1;
		}
		this.setState({index});
	}
	changeRun(isStop,key){
			if(isStop){
				this.stopRun();
			}else{
				this.beginRun();
			}
	}
	render(){
		let {width,height,index,pages} = this.state;
		let pageElements = pages.map((item,key)=>{
			return (<div key={key} className={`carousel-list${key==index?' carousel-animate':''}`} style={{width:width,height:height}}>{item.page}</div>);
		});
		let btnsElements = pages.map((item,key)=>{
			return (<div key={key} onClick={()=>this.setIndex(key,true)}  className={`carousel-btn${key==index?' selected':''}`}></div>)
		});
		return (
			<div className='carousel-component' onMouseEnter={()=>this.changeRun(true)} onMouseLeave={()=>this.changeRun(false)} style={{width:width,height:height}}>
				<div className="carousel-lists clearfix" style={{width:width*4,transform:`translate(-${index*width}px,0)`}}>
					{pageElements}
				</div>
				<div className="carousel-btns">
					{btnsElements}
				</div>

			</div>);
	}
}

export default Carousel