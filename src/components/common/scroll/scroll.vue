<template>
    <div class="scrollwrap" ref="scrollwrap">
        <div class="scrollcontent">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: "scroll",
    props:{
        bstype:{
            type: Number,
            default: 0
        },
        pullUpLoad:{
            type: Boolean,
            default:false
        }
    },
    data(){
        return{
            scroll:{}
        }
    },
    mounted(){
        // 1.创建scroll对象
        // 这样获取元素，不太好
        // console.log(document.querySelector('.scrollwrap'))
        this.scroll = new BScroll(this.$refs.scrollwrap,{
            // 2.XX版本，要设置这个属性
            observeDOM: true,
            // 点击事件保持响应
            click:true,
            // 是否监听滚动
            probeType:this.bstype,
            // 监听上拉事件
            pullUpLoad: this.pullUpLoad
        })

        // 2.监听滚动的位置
        this.scroll.on('scroll', (position) => {
        //   console.log(position)
          this.$emit('scroll', position)
        })
        // console.log(this.bstype)

        // 3.监听上拉事件
        this.scroll.on('pullingUp', () => {
            this.$emit('pullingUp')
        })
    },
    methods: {
    //   scrollTo(x, y, time = 300) {
    //     this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    //   }
    }
}
</script>

<style lang="scss" scoped>
// .scrollwrap{
//     .scrollcontent{

//     }
// }
</style>
