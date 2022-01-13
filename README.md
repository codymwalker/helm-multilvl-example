# helm-multilvl-example
This is an example of parent and subchart relationships demonstrating two things:
- Conditional ingress routing based on enabled versions of a service
- Variable overrides of subcharts from the parent chart's values.yaml

### Structure

The example leverages two example applications that user ExpressJS to print different messages. For convenience sake, these applications are published as docker images:
- cmwalker/helm-multilvl-v1
- cmwalker/helm-multilvl-v2

In each case, the application simply prints the version number along with the environment variables for the application.
The environment variables allow us to demonstrate variable override via the configmap artifacts in each chart.

The project structure consists of the application code along with three helm charts:
- helm/helm-multilvl-v1
- helm/helm-multilvl-v2
- helm/helm-multilvl-ingress

The application charts provide a barebones kubernetes deployment of the corresponding applications. They each deploy three artifacts:
- Deployment: The application itself
- ConfigMap: Contains random data that is read by the deployment in order to show variable override
- Service: Exposes the respective services as a NodePort service that can be accessed within the cluster.

The ingress chart reads the values.yaml file in order to determine which services are deployed, and therefore which applications should be served.

### Use

Each subchart can be installed independently to a kubernetes cluster. Doing so will show that they each operate independently with their corresponding values.yaml files.

Modifying the top level values.yaml file and installing that chart will override the variables that are provided in the subcharts. This allows you to override and inject the randomData variable printed in the envrionment variables on responses, along with enabling/disabling the ingress path components.