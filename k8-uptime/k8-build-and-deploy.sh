eval $(minikube docker-env)
docker build -t randomly-die:1.0 .
kubectl run randomly-die --image randomly-die:1.0 --image-pull-policy=Never
