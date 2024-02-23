- 访问地址：

https://stock-demo-vhfv.vercel.app/

- 本地启动： ```npm run dev```

## 补充说明

在sample/index.md

有一个弹窗组件，是我自己写的比较好玩的一个东西。

用法如下
```tsx
//调用confirm会打开一个弹窗，此时会等待点击确认按钮
// 如果点击了取消，await之后的代码都不会执行
        const { done, failed } = await confirm({
            title: `Unblock xxx`,
            message: `Are you sure you want to Unblock xxx?`,
            confirmLabel: 'Block',
        });
// 点击确认按钮，代码从这里开始执行，后续的逻辑
// 同时弹窗上的确认按钮开始转圈
        try {
            await unblockUser({
                showId,
                data: {
                    id: id,
                },
            });
// 调用这个done，确认按钮会停止转圈，并且弹窗关闭。
            done();
        } catch (error) {
            failed(error);
        }
```


