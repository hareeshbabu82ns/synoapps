cd Test
rm package.tgz
rm *.spk

tar -czf package.tgz htest/*
tar -cvf test.spk *
